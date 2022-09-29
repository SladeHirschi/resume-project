const con = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
});

con.connect(function (err) {
	if (err) {
		console.error('Database connection failed: ' + err.stack);
		return;
	}
	console.log("Connected!");
});

export default con;