const express = require('express');
const bcrypt = require('bcrypt')

const knex = require('../../db/knex.js');

const authPosts = require("../../auth/_blog.js");


const app = express();

const saltRounds = bcrypt.genSaltSync(10);


// Get all user from database
app.get("/", (req, res) => {
  try {
    knex("users")
  .then(users => {
    res.status(200).json({
      status: 'ok',
      data: users,
    });
  })
  } catch (err) {
    res.status(400).json({
      status: 'err',
      error: err,
    });
  }
})

// Get user by :id from database
app.get('/:id', function (req, res) {
  knex
  .from('users')
  .where('users.id', req.params.id)
  .then(function (users) {
    res.status(200).json({
      status: 'ok',
      data: users,
    });
  });
});

// Put update user by :id
app.put('/:id', function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
	knex('users')
		.where('id', req.params.id)
		.update({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
			email: req.body.email,
			password: hash,
		})
		.then(function () {
			knex
				.select()
        .where('users.id', req.params.id)
				.from('users')
				.then(function (user) {
          res.status(200).json({
              status: 'ok',
              data: user
            });
				})
        .catch(function (err) {
          res.status(400).json({
            status: 'error',
            error: err,
          })
        });
		});
});

//Delete user by :id
app.delete('/:id', function (req, res) {
	knex('users')
		.where('id', req.params.id)
		.del()
		.then(function () {
			knex
				.select()
				.from('users')
				.then(function (users) {
					res.status(200).json({
            status: 'ok',
            data: users,
          });
				})
        .catch(function (err) {
            res.status(400).json({
              status: 'error',
              error: err,
            })
        });
		});
});

app.get("/users-posts/:id", (req, res) => {
  return authPosts
    .getUserBlogs(req, res)
})
module.exports = app;