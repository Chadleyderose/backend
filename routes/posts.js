const express = require('express');

const app = express();
const blogController = require('../controllers/Blog');


app.use('/', blogController);




module.exports = app;