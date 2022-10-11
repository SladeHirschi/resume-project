const con = require('../database/databaseInit');
const util = require('util');
const query = util.promisify(con.query).bind(con);

exports.getWorkData = async (userId) => {
    var result = await query(`
        SELECT 
            occupation, 
            company, 
            description, 
            start_date as startDate, 
            end_date as endDate, 
            is_current AS isCurrent, 
            type 
        FROM work_data 
        WHERE user_id = ?`, [userId]);
    return result;
}

exports.getBasicInfo = async (userId) => {
    var result = await query('SELECT label, value, hyperlink AS link FROM basic_info WHERE user_id = ?', [userId]);
    return  result;
}

exports.getContactInfo = async (userId) => {
    var result = await query('SELECT label, value, hyperlink AS link FROM contact_info WHERE user_id = ?', [userId]);
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