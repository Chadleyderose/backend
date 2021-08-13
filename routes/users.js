const express = require('express');

const app = express();
const userController = require('../controllers/Users');

// Users controller controllers/app/users
app.use('/', userController);

module.exports = app;