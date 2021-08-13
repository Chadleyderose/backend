const express = require('express');

const knex = require('../../db/knex.js');

const authBlog = require("../../auth/_blog.js");


const app = express();

// Get all products from database
app.get("/", (req, res) => {
  return authBlog
    .getAllBlogs(req, res)
})

// Get product by :id from database
app.get('/:id', function (req, res) {
  try {
    knex
      .from('posts')
      .where('posts.id', req.params.id)
      .then(function (post) {
      res.status(200).json({
        status: 'ok',
        data: post,
      });
    });
  } 
  catch (err) {
    res.status(400).json({
      status: 'error',
      data: err
    })
  }
});

// Put update product by :id
app.put('/:id', function (req, res) {
  try {
    knex('posts')
		.where('id', req.params.id)
		.update({
      title: req.body.title,
			message: req.body.message,
      comment: req.body.comment
		})
		.then(function () {
			knex
				.select()
        .where('posts.id', req.params.id)
				.from('posts')
				.then(function (post) {
          res.status(200).json({
              status: 'ok',
              data: post
            });
				})
        .catch(function (err) {
          res.status(400).json({
            status: 'error',
            error: err,
          })
        });
		});
  } catch (err) {
    res.status(500).json({
      status: 'internal error',
      data: err
    })
  }
	
});

// Delete product by :id
app.delete('/:id', function (req, res) {
	try {
    knex('posts')
		.where('id', req.params.id)
		.del()
		.then(function () {
			knex
				.select()
				.from('posts')
				.then(function (post) {
					res.status(200).json({
            status: 'ok',
            data: post,
          });
				})
        .catch(function (err) {
            res.status(400).json({
              status: 'error',
              error: err,
            })
        });
		});
  } catch (err) {
    res.status(500).json({
      status: 'Internal Error',
      data: err
    })
  }
});
module.exports = app;