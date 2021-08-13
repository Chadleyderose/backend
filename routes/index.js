const express = require('express');

const app = express();
const serverController = require('../controllers/Server');


app.get('/', serverController);




module.exports = app;