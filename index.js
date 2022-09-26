const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: '*' }))

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

	res.json({success: true})

})

app.post('/sendEmail', (req, res) => {
	var body = req.body.body;
	var sender = req.body.sender;
	console.log("sender: ", req.body.sender)
	if (sender.length === 0) {
		res.send({ error: 'Must contain a sender email' })
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

	res.json({success: true})

})

app.listen(port, () => {
	console.log(`Server running on ${port}.`);
});