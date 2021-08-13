const knex = require("../db/knex");
const { v4 } = require("uuid");


function createPost(req, res) {
  return knex("posts")
    .insert({
      id: v4(),
      title: req.body.title,
      post: req.body.post,
    })
    .returning(["id", "title", "post"])
    .then((post) => {
      res.status(200).json({
        status: "ok",
        data: post[0],
      });
    })
    .catch((err) =>
      res.status(400).json({
        status: "error",
        data: err,
      })
    );
}

function commentPost(req, res) {
  try {
    knex('posts')
		.where('id', req.params.id)
		.update({
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
}
module.exports = {
  createPost,
  commentPost
};
