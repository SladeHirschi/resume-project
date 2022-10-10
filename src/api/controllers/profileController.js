const profile_model = require('../models/profileModel');

exports.getWorkData = async (req, res) => {
    var userId = req.query.userId;
    var workData = await profile_model.getWorkData(userId);
    res.status(200).json({workData})
}

exports.getBasicInfo = async (req, res) => {
    var userId = req.query.userId;
    var basicInfo = await profile_model.getBasicInfo(userId);
    res.status(200).json({basicInfo})
}

exports.getContactInfo = async (req, res) => {
    var userId = req.query.userId;
    var contactInfo = await profile_model.getContactInfo(userId);
    res.status(200).json({contactInfo})
}