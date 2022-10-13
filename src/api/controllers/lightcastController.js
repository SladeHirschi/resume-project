const lightcast_model = require('../models/lightcastModel')

exports.getSkills = async (req, res) => {
    skills = await lightcast_model.getSkills();
    res.json(skills);
}

exports.getCategories = async (req, res) => {
    var userId = req.query.userId;
    categories = await lightcast_model.getCategories(userId);
    res.json(categories);
}

exports.createSkill = async (req, res) => {
    var userId = req.query.userId;
    var label = req.body.label;
    var value = req.body.value;
    lightcast_model.createSkill(userId, label, value);
    res.status(201).end();
}