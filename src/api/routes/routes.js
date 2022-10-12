const express = require('express')
const router = express.Router()
const email_controller = require('../controllers/emailController');
const twilio_controller = require('../controllers/twilioController');
const profile_controller = require('../controllers/profileController');
const auth_model = require('../models/authModel');

// middleware that is specific to this router
// router.use(async (req, res, next) => {
//     var authHeader = req.headers.authorization ?? '';
//     if (authHeader.startsWith("Bearer ")) {
//         var token = authHeader.substring(7, authHeader.length);
//         var {success, message, err} = await auth_model.verifyJWT(token);
//         if (success === false) {
//             res.status(400).json({message: message, err: err});
//         } else {
//             next()
//         }
//     } else {
//         res.status(401).json({success: false, message: 'unathorized'});
//     }
// })
router.post('/sendEmail', email_controller.sendEmail)
router.post('/sendSMS', twilio_controller.sendSMS)
router.get('/getWorkData', profile_controller.getWorkData)
router.get('/getBasicInfo', profile_controller.getBasicInfo)
router.get('/getContactInfo', profile_controller.getContactInfo)

router.post('/workData', profile_controller.createWorkData)
router.post('/basicInfo', profile_controller.createBasicInfo)
router.post('/contactInfo', profile_controller.createContactInfo)

router.put('/basicInfo/:id', profile_controller.editBasicInfo)

router.delete('/basicInfo/:id', profile_controller.deleteBasicInfo)



module.exports = router