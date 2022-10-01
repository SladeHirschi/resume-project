const user_model = require('../models/userModel.js');

exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var {success, message, code} = user_model.login(email, password);
        res.sendStatus(code);
        res.json({message: message})
}