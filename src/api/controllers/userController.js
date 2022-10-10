const user_model = require('../models/userModel.js');

exports.login = async (req, res) => {
    var user = new user_model.User()
    user.email = req.body.email;
    user.password = req.body.password;

    var {success, message, code, token} = await user_model.login(user);
    res.status(code).json({ message: message, token: token })
}

exports.signUp = async (req, res) => {
    var b = req.body;
    var user = new user_model.User(null, b.firstName, b.lastName, b.dateOfBirth, b.phoneNumber, b.email, b.password, b.created)

    var {success, message, code, token} = await user_model.signUp(user);
    res.status(code).json({success: success, message: message, token: token})
}