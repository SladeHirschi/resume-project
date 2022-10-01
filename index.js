const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const path = require('path');
const router = require('./src/api/routes/routes');
const user_controller = require('./src/api/controllers/userController');

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: '*' }))
app.use(express.static(path.join(__dirname, 'build')));
app.post('/login', user_controller.login);
app.use('/', router);

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Server running on ${port}.`);
});