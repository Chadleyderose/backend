const knex = require("../db/knex");


function getAllBlogs(req, res) {
  try {
    knex()
				.select()
				.from('users_posts')
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
  } catch (err) {
    res.status(500).json({
      status: 'internal error',
      data: err
    })
  }
}

function getUserBlogs(req, res) {
  try {
    knex()
    .from('posts')
		.innerJoin('users', 'posts.user_id', 'users.id')
		.where('posts.user_id', req.params.id)
		.then(function (posts) {
			res.status(200).json({
        status: 'ok',
        data: posts
      });
		});
  } catch (error) {
    res.status(400).json({
      status: 'bad',
      data: error
    })
  }
}
function getBlogId(req, res) {
  
}

module.exports = {
  getAllBlogs,
  getUserBlogs,
  getBlogId
};
