const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: 'null' }))

const port = process.env.PORT || 8080;

app.post('/sendSMS', (req, res) => {
	const accountSid = process.env.TWILIO_ACCOUNT_SID;
	const authToken = process.env.TWILIO_AUTH_TOKEN;
	const fromNumber = process.env.TWILIO_NUMBER;
	const client = require('twilio')(accountSid, authToken);

	client.messages
		.create({
			to: '+14352181442',
			from: fromNumber,
			body: req.body.message
		})
		.then(message => console.log(message.sid))
		.done();

})

app.listen(port, () => {
	console.log(`Timezones by location application is running on port ${port}.`);
});