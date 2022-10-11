const con = require('../database/databaseInit');
const util = require('util');
const bcrypt = require('bcrypt');
const authModel = require('./authModel');

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
    var result = await query('SELECT id, first_name, last_name, password FROM users WHERE email = ?;', [user.email])
    var storedPassword = result[0]?.password;
    var userId = result[0]?.id;
    var firstName = result[0]?.first_name;
    var lastName = result[0]?.last_name;

    if (result.length !== 0) {
        var validPassword = await bcrypt.compare(user.password, storedPassword);
        if (validPassword) {
            var payload = {
                userId,
                firstName,
                lastName
            }
            var token = authModel.createJWT(payload);
            return { success: true, message: "Valid password", code: 200, token: token };
        } else {
            return { success: false, message: "Invalid Password", code: 400, token: null };
        }
    } else {
        return { success: false, message: "User does not exist", code: 401, token: null };
    }
}

exports.signUp = async (user) => {
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(user.password, salt);
    try {
        var result = await query(`
            INSERT INTO users
                (first_name, last_name, date_of_birth, phone_number, email, password, created)
            VALUES
                (?, ?, ?, ?, ?, ?, NOW())
        `, [user.firstName, user.lastName, user.dateOfBirth, user.phoneNumber, user.email, hashedPassword])
        var payload = {
            userId: result.insertId,
            firstName: user.firstName,
            lastName: user.lastName
        }
        var token = authModel.createJWT(payload);
        return { success: true, message: 'user created', code: 201, token: token };
    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY') {
            return { success: false, message: 'duplicate email', code: 409, token: null };
        } else {
            return { success: false, message: 'there was a problem inserting', code: 500, token: null };
        }
    }
}