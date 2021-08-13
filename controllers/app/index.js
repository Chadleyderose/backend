const express = require("express");
const router = express.Router();

const authHelpers = require("../../auth/_helpers.js");
const authPosts = require("../../auth/_posts.js");


router.post("/register", (req, res) => {
  return authHelpers
    .createUser(req, res)

});

router.post('/login', (req, res, next) => {
  return authHelpers
  .Login(req, res)
});

router.get('/verify',
  authHelpers
  .ensureAuthenticated
);

// Post Routes
router.post("/posts", (req, res) => {
  return authPosts
    .createPost(req, res)
});

router.post("/posts/:id", (req, res) => {
  return authPosts
    .commentPost(req, res)
});
module.exports = router;
