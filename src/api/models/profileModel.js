const con = require('../database/databaseInit');
const util = require('util');
const query = util.promisify(con.query).bind(con);

exports.getWorkData = async (userId) => {
    var result = await query('SELECT * FROM work_data WHERE user_id = ?', [userId]);
    return  result;
}