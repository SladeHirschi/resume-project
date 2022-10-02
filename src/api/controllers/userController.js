const user_model = require('../models/userModel.js');

exports.login = async (req, res) => {
    var user = new user_model.User()
    user.email = req.body.email;
    user.password = req.body.password;

    var response = await user_model.login(user);
    console.log("RESPOnSE: ", response)
    // res.sendStatus(code);
    // res.status(code).json({ message: message })
}