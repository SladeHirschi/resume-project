const twilioModel = require('../models/twilioModel');


exports.sendSMS = (req, res) => {
    var message = req.body.message;
	var { success, message } = twilioModel.sendSMS(message);
	if (success === true) {
		res.json({ success: true, message: '' })
	} else {
		res.json({ success: false, message: message })
	}
}