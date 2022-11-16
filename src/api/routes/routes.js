const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const email_controller = require('../controllers/emailController');
const twilio_controller = require('../controllers/twilioController');
const profile_controller = require('../controllers/profileController');
const lightcast_controller = require('../controllers/lightcastController');
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
router.get('/workdata', profile_controller.getWorkData)
router.get('/basicInfo', profile_controller.getBasicInfo)
router.get('/contactInfo', profile_controller.getContactInfo)
router.get('/profilePicture', profile_controller.getProfilePicture)

router.post('/workData', profile_controller.createWorkData)
router.post('/basicInfo', profile_controller.createBasicInfo)
router.post('/contactInfo', profile_controller.createContactInfo)

router.put('/workData/:id', profile_controller.editWorkData)
router.put('/basicInfo/:id', profile_controller.editBasicInfo)
router.put('/contactInfo/:id', profile_controller.editContactInfo)

router.delete('/workData/:id', profile_controller.deleteWorkData)
router.delete('/basicInfo/:id', profile_controller.deleteBasicInfo)
router.delete('/contactInfo/:id', profile_controller.deleteContactInfo)

router.post('/upload', upload.single('profilePicture'), profile_controller.upload)

router.get('/skills', lightcast_controller.getSkills)
router.get('/categories', lightcast_controller.getCategories)

router.post('/skills', lightcast_controller.createSkill)
router.post('/categories', lightcast_controller.createCategory)

router.put('/skills/:id', lightcast_controller.updateSkill)

router.delete('/skills/:id', lightcast_controller.deleteSkill)
router.delete('/categories/:id', lightcast_controller.deleteCategory)

router.get('/getProjects', profile_controller.getProjects)
router.post('/createproject', profile_controller.createProject)
router.put('/projects/:id', profile_controller.updateProject)
router.delete('/projects/:id', profile_controller.deleteProject)


module.exports = router