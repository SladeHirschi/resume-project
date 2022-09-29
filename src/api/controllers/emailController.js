const email_model = require('../models/emailModel')

exports.sendEmail = (req, res) => {
	var body = req.body.body;
	var sender = req.body.sender;
	var { success, message } = email_model.sendEmail(body, sender);
	if (success === true) {
		res.json({ success: true, message: '' });
	} else {
		res.json({ success: false, message: message });
	}
}