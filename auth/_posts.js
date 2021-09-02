const knex = require("../db/knex");
const { v4 } = require("uuid");


function getAllPosts(req, res) {
    knex('users_posts')
				.then((posts) => {
          res.status(200).json({
            status: 'ok',
            data: posts
          })
        })
}


function LikeCounter(req, res){ 
  knex
}
// function commentPost(req, res) {
//   try {
//     knex('posts')
// 		.where('id', req.params.id)
// 		.update({
//       comment: req.body.comment
// 		})
// 		.then(function () {
// 			knex
// 				.select()
//         .where('posts.id', req.params.id)
// 				.from('posts')
// 				.then(function (post) {
//           res.status(200).json({
//               status: 'ok',
//               data: post
//             });
// 				})
//         .catch(function (err) {
//           res.status(400).json({
//             status: 'error',
//             error: err,
//           })
//         });
// 		});
//   } catch (err) {
//     res.status(500).json({
//       status: 'internal error',
//       data: err
//     })
//   }
// }
module.exports = {
  getAllPosts,
  // commentPost
};
