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

exports.createWorkData = async (req, res) => {
    var userId = req.query.userId;
    var occupation = req.body.occupation;
    var company = req.body.company;
    var description = req.body.description;
    var startDate = req.body.startDate;
    var endDate = req.body.occupation;
    var isCurrent = req.body.isCurrent;
    var type = req.body.isCurrent;
    var contactInfo = await profile_model.createWorkData({userId, occupation, company, description, startDate, endDate, isCurrent, type});
    res.status(200).json({contactInfo})
}
 
exports.createBasicInfo = async (req, res) => {
    var userId = req.query.userId;
    var label = req.body.label;
    var value = req.body.value;
    var hyperlink = req.body.hyperlink;
    var contactInfo = await profile_model.createBasicInfo({userId, label, value, hyperlink});
    res.status(200).json({contactInfo})
}

exports.createContactInfo = async (req, res) => {
    var userId = req.query.userId;
    var label = req.body.label;
    var value = req.body.value;
    var hyperlink = req.body.hyperlink;
    var contactInfo = await profile_model.createContactInfo({userId, label, value, hyperlink});
    res.status(200).json({contactInfo})
}
