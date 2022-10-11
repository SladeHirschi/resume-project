const mysql = require('mysql');

const con = mysql.createConnection(process.env.DATABASE_CONNECTION_STRING);

con.connect(function (err) {
	if (err) {
		console.error('Database connection failed: ' + err.stack);
		return;
	}
});

module.exports = con;