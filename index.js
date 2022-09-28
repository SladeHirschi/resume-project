const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const path = require('path');

// const con = mysql.createConnection({
// 	host: process.env.DATABASE_HOST,
// 	user: process.env.DATABASE_USERNAME,
// 	password: process.env.DATABASE_PASSWORD,
// });

// con.connect(function (err) {
// 	if (err) {
// 		console.error('Database connection failed: ' + err.stack);
// 		return;
// 	}
// 	console.log("Connected!");
// });

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: '*' }))

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
	console.log("CAN YOU SEE THIS?")
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.post('/sendSMS', (req, res) => {
	const accountSid = process.env.TWILIO_ACCOUNT_SID;
	const authToken = process.env.TWILIO_AUTH_TOKEN;
	const fromNumber = process.env.TWILIO_NUMBER;
	const client = require('twilio')(accountSid, authToken);

	var message = req.body.message

	client.messages
		.create({
			to: '+14352181442',
			from: fromNumber,
			body: message
		})
		.then(message => console.log(message.sid))
		.done();

	res.json({ success: true })

})

app.post('/sendEmail', (req, res) => {
	var body = req.body.body;
	var sender = req.body.sender;
	console.log("sender: ", req.body.sender)
	if (sender.length === 0) {
		res.send({ error: 'Must contain a sender email' })
		return;
	}
	console.log(process.env.GMAIL_EMAIL, process.env.GMAIL_PASSWORD)
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_EMAIL,
			pass: process.env.GMAIL_PASSWORD
		}
	});

	var mailOptions = {
		from: sender,
		to: 'sladehirsc@gmail.com',
		subject: 'From Web App',
		text: body
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	res.json({ success: true })

})

app.listen(port, () => {
	console.log(`Server running on ${port}.`);
});