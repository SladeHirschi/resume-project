const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const path = require('path');
const router = require('./src/api/routes/routes');

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: '*' }))
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', router);

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Server running on ${port}.`);
});