const con = require('../database/databaseInit');
const util = require('util');
const query = util.promisify(con.query).bind(con);
const fs = require('fs');

const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-west-1'
});

exports.getWorkData = async (userId) => {
    var result = await query(`
        SELECT 
            id,
            occupation, 
            company, 
            description, 
            start_date as startDate, 
            end_date as endDate, 
            is_current, 
            type 
        FROM work_data 
        WHERE user_id = ?`, [userId]);
    result.map(res => {res.isCurrent = res.is_current == 1})
    return result;
}

exports.getBasicInfo = async (userId) => {
    var result = await query('SELECT id, label, value, hyperlink AS link FROM basic_info WHERE user_id = ?', [userId]);
    return  result;
}

exports.getContactInfo = async (userId) => {
    var result = await query('SELECT id, label, value, hyperlink AS link FROM contact_info WHERE user_id = ?', [userId]);
    return  result;
}

exports.createWorkData = async (userId, occupation, company, description, startDate, endDate, isCurrent, type) => {
    var result = await query(`
        INSERT INTO work_data 
            (user_id, occupation, company, description, start_date, end_date, is_current, type) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)`, [userId, occupation, company, description, startDate, endDate, isCurrent, type])
    return result.insertId
}

exports.createBasicInfo = async (userId, label, value, hyperlink) => {
    var result = await query(`
        INSERT INTO basic_info 
            (user_id, label, value, hyperlink) 
        VALUES 
            (?, ?, ?, ?)`, [userId, label, value, hyperlink])
    return result.insertId
}

exports.createContactInfo = async (userId, label, value, hyperlink) => {
    var result = await query(`
        INSERT INTO contact_info 
            (user_id, label, value, hyperlink) 
        VALUES 
            (?, ?, ?, ?)`, [userId, label, value, hyperlink])
    return result.insertId
}

exports.editBasicInfo = async (id, label, value, hyperlink) => {
    var result = await query(`UPDATE basic_info SET label = ?, value = ?, hyperlink = ? WHERE id = ?`, [label, value, hyperlink, id])
    return true
}

exports.deleteBasicInfo = async (id) => {
    var result = await query(`DELETE FROM basic_info WHERE id = ?`, [id])
    return true
}

exports.editContactInfo = async (id, label, value, hyperlink) => {
    var result = await query(`UPDATE contact_info SET label = ?, value = ?, hyperlink = ? WHERE id = ?`, [label, value, hyperlink, id])
    return true
}

exports.deleteContactInfo = async (id) => {
    var result = await query(`DELETE FROM contact_info WHERE id = ?`, [id])
    return true
}

exports.editWorkData = async (id, occupation, company, description, startDate, endDate, isCurrent, type) => {
    var result = await query(`
        UPDATE work_data 
        SET 
            occupation = ?, 
            company = ?, 
            description = ?,
            start_date = ?,
            end_date = ?,
            is_current = ?, 
            type = ?
        WHERE id = ?`, [occupation, company, description, startDate, endDate, isCurrent, type, id])
    return true
}

exports.deleteWorkData = async (id) => {
    var result = await query(`DELETE FROM work_data WHERE id = ?`, [id])
    return true
}

exports.upload = async (file, userId, table) => {
    // refactor all of this and test it
    let params = {
        Bucket: "slade-hirschi-resume-bucket",
        Key: file.filename,
        Body: fs.readFileSync(file.path)
    };
    if (table === "profile_pictures") {
        var {insertedId, url, error} = await this.uploadProfilePicture(params, userId);
    } else if (table === "projects") {
        var {insertedId, url, error} = await this.uploadProjectPicture(params, userId);
    } else {
        var url = "";
        var error = "table name did not match any table"
    }
    return {insertedId, url, error}
}

exports.getProfilePicture = async (userId) => {
    const result = await query(`SELECT public_url FROM profile_pictures WHERE user_id = ? AND is_deleted = 0`, [userId]);
    return result[0] ? result[0].public_url : '';
}

exports.uploadProfilePicture = async (params, userId) => {
    try {
        let uploadPromise = await new AWS.S3().putObject(params).promise();
        let publicUrl = `https://${params.Bucket}.s3.us-west-2.amazonaws.com/${params.Key}`;
            const previousProfilePic = await this.getProfilePicture(userId);
        if (previousProfilePic.length === 0 ){
            const result = await query(`INSERT INTO profile_pictures (public_url, user_id, is_deleted) VALUES (?, ?, 0)`, [publicUrl, userId]);
        } else {
            await query(`UPDATE profile_pictures SET public_url = ? WHERE user_id = ?`, [publicUrl, userId]);
        }
        return {insertedId: result.insertId, url: publicUrl, error: null};
    } catch (e) {
        console.log("e: ", e)
        return {url: "", error: e};
    }
}

exports.uploadProjectPicture = async (params, userId) => {
    try {
        let uploadPromise = await new AWS.S3().putObject(params).promise();
        let publicUrl = `https://${params.Bucket}.s3.us-west-2.amazonaws.com/${params.Key}`;
        const result = await query(`INSERT INTO projects (public_url, user_id, is_deleted) VALUES (?, ?, 0)`, [publicUrl, userId]);
        return {insertedId: result.insertId, url: publicUrl, error: null};
    } catch (e) {
        console.log("e: ", e)
        return {url: "", error: e};
    }
}

exports.getProjects = async (userId) => {
    var result = await query(`SELECT id, public_url AS image, hyperlink AS link, title AS name, description FROM projects WHERE user_id = ? AND is_deleted = 0`, [userId]);
    return result;
}

exports.createProject = async (userId, title, description, link, publicURL) => {
    var result = await query(`INSERT INTO projects (title, description, hyperlink, public_url, user_id) VALUES (?, ?, ?, ?, ?)`, [title, description, link, publicURL, userId]);
    return result;
}

exports.updateProject = async (id, title, description, link, publicURL) => {
    var result = await query(`UPDATE projects SET title = ?, description = ?, hyperlink = ?, public_url = ? WHERE id = ?`, [title, description, link, publicURL, id]);
    return result;
}

exports.deleteProject = async (id) => {
    var result = await query(`UPDATE projects SET is_deleted = 1 WHERE id = ?`, [id]);
    return;
}