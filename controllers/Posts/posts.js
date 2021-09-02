const express = require('express');

const knex = require('../../db/knex.js');

const authPost = require("../../auth/_posts");


const app = express();
app.get("/", (req, res) => {
    return authPost
      .getAllPosts(req, res)
  })
// Get all products from database
app.post("/:id", (req, res) => {
    return knex("users")
    .where('id', '=', req.params.id)
    .select(["*"])
    .then((user) => {
        const user_id = user[0].id
        console.log(user_id)
      knex('users_posts')
      .insert({
        user_id : user_id,
        post_title: req.body.post_content,
        post_likes: req.body.post_likes,
        post_tags: req.body.post_tags,
        post_describtion: req.body.post_describtion,
        image: req.body.image
      })
      .select(["*"])
      .then((posts) => {
        res.status(200).json({
          status: 'ok',
          data: posts
        })
      })
    
    })
    .catch((error) => {
      // console.log(error)
    })
})

// Get all products from database
app.put("/like/:id", (req, res) => {
    return knex("users_posts")
    .where('id', '=', req.params.id)
    .select()
    .update({
        post_likes: req.body.post_likes,
      })
    .returning(['*'])
    .then(function () {
        knex
            .select()
    .where('users_posts.id', req.params.id)
            .from('users_posts')
            .then(function (posts) {
      res.status(200).json({
          status: 'ok',
          data: posts
        });
            })
    .catch(function (err) {
      res.status(400).json({
        status: 'error',
        error: err,
      })
    });
    });
})

module.exports = app;