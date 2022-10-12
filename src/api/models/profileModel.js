const con = require('../database/databaseInit');
const util = require('util');
const query = util.promisify(con.query).bind(con);

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

exports.createWorkData = async ({userId, occupation, company, description, startDate, endDate, isCurrent, type}) => {
    var result = await query(`
        INSERT INTO work_data 
            (user_id, occupation, company, description, start_date, end_date, is_current, type) 
        VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?)`, [userId, occupation, company, description, startDate, endDate, isCurrent, type])
    return result.insertId
}

exports.createBasicInfo = async ({userId, label, value, hyperlink}) => {
    var result = await query(`
        INSERT INTO basic_info 
            (user_id, label, value, hyperlink) 
        VALUES 
            (?, ?, ?, ?)`, [userId, label, value, hyperlink])
    return result.insertId
}

exports.createContactInfo = async ({userId, label, value, hyperlink}) => {
    var result = await query(`
        INSERT INTO contact_info 
            (user_id, label, value, hyperlink) 
        VALUES 
            (?, ?, ?, ?)`, [userId, label, value, hyperlink])
    return result.insertId
}

exports.editBasicInfo = async ({id, label, value, hyperlink}) => {
    var result = await query(`UPDATE basic_info SET label = ?, value = ?, hyperlink = ? WHERE id = ?`, [label, value, hyperlink, id])
    return true
}

exports.deleteBasicInfo = async (id) => {
    var result = await query(`DELETE FROM basic_info WHERE id = ?`, [id])
    return true
}

exports.editContactInfo = async ({id, label, value, hyperlink}) => {
    var result = await query(`UPDATE contact_info SET label = ?, value = ?, hyperlink = ? WHERE id = ?`, [label, value, hyperlink, id])
    return true
}

exports.deleteContactInfo = async (id) => {
    var result = await query(`DELETE FROM contact_info WHERE id = ?`, [id])
    return true
}

exports.editWorkData = async ({id, occupation, company, description, startDate, endDate, isCurrent, type}) => {
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