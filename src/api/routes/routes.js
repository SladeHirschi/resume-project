const express = require('express')
const router = express.Router()
const email_controller = require('../controllers/emailController');
const twilio_controller = require('../controllers/twilioController');

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next()
})
router.post('/sendEmail', email_controller.sendEmail)
router.post('/sendSMS', twilio_controller.sendSMS)

module.exports = router