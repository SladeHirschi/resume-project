const con = require('../database/databaseInit');
const util = require('util');
const query = util.promisify(con.query).bind(con);

exports.getWorkData = async (userId) => {
    var result = await query('SELECT * FROM work_data WHERE user_id = ?', [userId]);
    return  result;
}

exports.getBasicInfo = async (userId) => {
    var result = await query('SELECT * FROM basic_info WHERE user_id = ?', [userId]);
    return  result;
}

exports.getContactInfo = async (userId) => {
    var result = await query('SELECT * FROM contact_info WHERE user_id = ?', [userId]);
    return  result;
}