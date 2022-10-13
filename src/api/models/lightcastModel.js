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
    var result = await query(`SELECT * FROM categories WHERE user_id = ?`, [userId]);
    return result
}


exports.createSkill = async (userId, label, value) => {
    await query(`INSERT INTO skills (user_id, label, value) VALUES (?, ?, ?)`, [userId, label, value]);
}