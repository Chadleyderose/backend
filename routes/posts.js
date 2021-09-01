const express = require('express');

const app = express();
const PostController = require('../controllers/Posts/posts');


app.use('/', PostController);




module.exports = app;