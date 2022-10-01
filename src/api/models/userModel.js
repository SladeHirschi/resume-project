const con = require('../database/databaseInit');

exports.login = (email, password) => {

    con.query('SELECT password FROM users WHERE email = ?;', [email], function (err, result) {
        if (err) throw err;
        console.log("result: ", result);
        storedPassword = result[0]?.password;

        if (result.length === 0) {
            // if there is no user with that email
            return { success: true, message: 'No user with email: ' + email + ' was found.', code: 401 };
        }
        console.log(storedPassword);
        console.log("password: ", password);
    });

    return { success: true, message: '', code: 200 };
}