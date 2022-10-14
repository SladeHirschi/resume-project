const request = require('request');
const con = require('../database/databaseInit');
const util = require('util');
const query = util.promisify(con.query).bind(con);

const lightcastRequest = (options) => {
    return new Promise(function (resolve, reject) {
        request(options, async function (error, response, body) {
            if (!error) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    })

}

const initTransaction = async () => {
    const options = {
        method: 'POST',
        url: 'https://auth.emsicloud.com/connect/token',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: {
            client_id: process.env.LIGHTCAST_CLIENT_ID,
            client_secret: process.env.LIGHTCAST_SECRET,
            grant_type: 'client_credentials',
            scope: 'emsi_open'
        }
    };

    var token;
    try {
        var response = await lightcastRequest(options);
        var parsedResponse = JSON.parse(response)
        token = parsedResponse.access_token;
        return token;
    } catch (error) {
        console.log("error: ", error);
        return false;
    }
}

exports.getSkills = async () => {
    var token = await initTransaction();
    const options = {
        method: 'GET',
        url: 'https://emsiservices.com/skills/versions/latest/skills?fields=id,name,isSoftware',
        headers: { Authorization: 'Bearer ' + token }
    };
    var response = await lightcastRequest(options);
    var parsedResponse = await JSON.parse(response);
    parsedResponse = parsedResponse.data.filter(data => data.isSoftware == true);
    return parsedResponse.map(data => {return {label: data.name, value: data.id}});
}

exports.getCategories = async (userId) => {
    var result = await query(`
        SELECT 
            JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'name', c.name, 'skills', s.skills)) AS categories
        FROM categories c 
        LEFT JOIN (
            SELECT
                category_id, 
                JSON_ARRAYAGG(JSON_OBJECT('id', id, 'label', label, 'value', value)) skills 
            FROM skills
            GROUP BY category_id
        ) s ON s.category_id = c.id
        WHERE c.user_id = ?`, [userId]);
    var categories = result[0].categories;
    return JSON.parse(categories)
}


exports.createSkill = async (userId, label, value, categoryId) => {
    await query(`INSERT INTO skills (user_id, label, value, category_id) VALUES (?, ?, ?, ?)`, [userId, label, value, categoryId]);
}

exports.createCategory = async (name, userId) => {
    await query(`INSERT INTO categories (name, user_id) VALUES (?, ?)`, [name, userId]);
}

exports.updateSkill = async (id, label, value) => {
    await query(`UPDATE skills SET label = ?, value = ? WHERE id = ?`, [label, value, id]);
}

exports.deleteSkill = async (id) => {
    await query(`DELETE FROM skills WHERE id = ?`, [id]);
}

exports.deleteCategory = async (id) => {
    await query(`DELETE FROM categories WHERE id = ?`, [id]);
}