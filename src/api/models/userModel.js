const con = require('../database/databaseInit');
const util = require('util');
const bcrypt = require('bcrypt');

const query = util.promisify(con.query).bind(con);

exports.User = class User {
    constructor(id = null, firstName = null, lastName = null, dateOfBirth = null, phoneNumber = null, email = null, password = null, created = null) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.dateOfBirth = dateOfBirth
        this.phoneNumber = phoneNumber,
        this.email = email,
        this.password = password
        this.created = created
    }
}

exports.login = async (user) => {
    var result = await query('SELECT password FROM users WHERE email = ?;', [user.email])
    storedPassword = result[0]?.password;

    if (result.length !== 0) {
        console.log("something");
        var validPassword = await bcrypt.compare(storedPassword, user.password);
        if (validPassword) {
            return { success: true, message: "Valid password", code: 200 };
        } else {
            return { success: false, message: "Invalid Password", code: 400 };
        }
    } else {
        return { success: false, message: "User does not exist", code: 401 };
    }
}

exports.signUp = async (user) => {
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(user.password, salt);
    console.log("hashed password: ", hashedPassword)
    try {
        var result = await query(`
            INSERT INTO users
                (first_name, last_name, date_of_birth, phone_number, email, password, created)
            VALUES
                (?, ?, ?, ?, ?, ?, NOW())
        `, [user.firstName, user.lastName, user.dateOfBirth, user.phoneNumber, user.email, hashedPassword])
        console.log("result: ", result)
    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY') {
            return {success: false, message: 'duplicate email', code: 409};
        } else {
            return {success: false, message: 'there was a problem inserting', code: 500};

        }
    }
}