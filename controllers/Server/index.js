const express = require('express');


const server = express();

server.set('trust proxy', 1) // trust first proxy
 


server.use('/', (req, res) => {
    try {
        res.status(200).json({
            status: 'ok',
            data: 'Chad Blogs',
          })
    } catch (err) {
        res.status(400).json({
            status: 'error',
            data: err,
          })
    }
})

// Register


module.exports = server;