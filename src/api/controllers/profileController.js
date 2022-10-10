const profile_model = require('../models/profileModel');

exports.getWorkData = async (req, res) => {
    var userId = req.query.userId;
    var workData = await profile_model.getWorkData(userId);
    res.status(200).json({workData})
}