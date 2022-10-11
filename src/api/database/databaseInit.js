const mysql = require('mysql');

console.log("CAN YOU SEE THESE ON HEROKU: ", process.env.DATABASE_USERNAME, process.env.DATABASE_NAME)

const con = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});

con.connect(function (err) {
	if (err) {
		console.error('Database connection failed: ' + err.stack);
		return;
	}
});

module.exports = con;