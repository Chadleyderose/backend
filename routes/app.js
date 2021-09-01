const express = require('express');

const app = express();
const appController = require('../controllers/app/index.js');


app.use('/', appController);

module.exports = app;