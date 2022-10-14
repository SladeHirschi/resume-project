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
    var categoryId = req.body.categoryId;
    lightcast_model.createSkill(userId, label, value, categoryId);
    res.status(201).end();
}

exports.updateSkill = async (req, res) => {
    var id = req.params.id;
    var label = req.body.label;
    var value = req.body.value;
    lightcast_model.updateSkill(id, label, value);
    res.status(201).end();
}

exports.deleteSkill = async (req, res) => {
    var id = req.params.id;
    lightcast_model.deleteSkill(id);
    res.status(201).end();
}

exports.createCategory = async (req, res) => {
    var userId = req.query.userId;
    var name = req.body.name;
    lightcast_model.createCategory(name, userId);
    res.status(201).end();
}

exports.deleteCategory = async (req, res) => {
    var id = req.params.id;
    lightcast_model.deleteCategory(id);
    res.status(201).end();
}
