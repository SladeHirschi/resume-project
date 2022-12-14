const profile_model = require('../models/profileModel');
var formidable = require('formidable');

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
    var endDate = req.body.endDate;
    var isCurrent = req.body.isCurrent;
    var type = req.body.isCurrent;
    var contactInfo = await profile_model.createWorkData(userId, occupation, company, description, startDate, endDate, isCurrent, type);
    res.status(200).json({contactInfo})
}
 
exports.createBasicInfo = async (req, res) => {
    var userId = req.query.userId;
    var label = req.body.label;
    var value = req.body.value;
    var hyperlink = req.body.hyperlink;
    var basicInfo = await profile_model.createBasicInfo(userId, label, value, hyperlink);
    res.status(200).json({basicInfo})
}

exports.createContactInfo = async (req, res) => {
    var userId = req.query.userId;
    var label = req.body.label;
    var value = req.body.value;
    var hyperlink = req.body.hyperlink;
    var contactInfo = await profile_model.createContactInfo(userId, label, value, hyperlink);
    res.status(200).json({contactInfo})
}

exports.editBasicInfo = async (req, res) => {
    var id = req.params.id;
    var label = req.body.label;
    var value = req.body.value;
    var hyperlink = req.body.hyperlink;
    var basicInfo = await profile_model.editBasicInfo(id, label, value, hyperlink);
    res.status(200).json({basicInfo})
}

exports.deleteBasicInfo = async (req, res) => {
    var id = req.params.id;
    await profile_model.deleteBasicInfo(id);
    res.status(200).end()
}

exports.editContactInfo = async (req, res) => {
    var id = req.params.id;
    var label = req.body.label;
    var value = req.body.value;
    var hyperlink = req.body.hyperlink;
    var contactInfo = await profile_model.editContactInfo(id, label, value, hyperlink);
    res.status(200).json({contactInfo})
}

exports.deleteContactInfo = async (req, res) => {
    var id = req.params.id;
    await profile_model.deleteContactInfo(id);
    res.status(200).end()
}

exports.editWorkData = async (req, res) => {
    var id = req.params.id;
    var occupation = req.body.occupation;
    var company = req.body.company;
    var description = req.body.description;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var isCurrent = req.body.isCurrent;
    var type = req.body.type;
    var workData = await profile_model.editWorkData(id, occupation, company, description, startDate, endDate, isCurrent, type);
    res.status(200).json({workData})
}

exports.deleteWorkData = async (req, res) => {
    var id = req.params.id;
    await profile_model.deleteWorkData(id);
    res.status(200).end()
}

exports.upload = async (req, res) => {
    var userId = req.query.userId;
    var table = req.query.table;
    if (!req.file) {
        res.status(500).json({message: "no files present"});
        return;
    }
    try {
        const {insertedId, url, error} = await profile_model.upload(req.file, userId, table);
        if (error != null) {
            res.status(500).json({message: error})
            return;
        }
        res.status(201).json({insertedId, url})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }

    res.status(201).end()
}

exports.getProfilePicture = async (req, res) => {
    var userId = req.query.userId;

    publicUrl = await profile_model.getProfilePicture(userId);
    res.status(200).json({publicUrl: publicUrl});
}

exports.getProjects = async (req, res) => {
    var userId = req.query.userId;

    projects = await profile_model.getProjects(userId);
    res.status(200).json({projects: projects});
}

exports.createProject = async (req, res) => {
    var userId = req.query.userId;
    var title = req.body.name;
    var description = req.body.description;
    var link = req.body.link;
    var publicURL = req.body.publicURL;

    result = await profile_model.createProject(userId, title, description, link, publicURL);
    if (!result) {
        res.status(500).json({message: error})
        return;
    }
    res.status(201).end();
}

exports.updateProject = async (req, res) => {
    var id = req.params.id;
    var title = req.body.name;
    var description = req.body.description;
    var link = req.body.link;
    var publicURL = req.body.publicURL;

    result = await profile_model.updateProject(id, title, description, link, publicURL);
    if (!result) {
        res.status(500).json({message: error})
        return;
    }
    res.status(200).end();
}

exports.deleteProject = async (req, res) => {
    var id = req.params.id;

    await profile_model.deleteProject(id);
    res.status(200).end();
}