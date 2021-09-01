const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");

const SECRET = "secret";

function createUser(req, res) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex("users")
    .insert({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: hash
    })
    .returning(["id", "username", "email", "password"])
    .then((users) => {
      res.status(200).json({
        status: "ok",
        data: users[0],
      });
    })
    .catch((err) =>
      res.status(404).json({
        status: "error",
        data: "user already in database",
      })
    );
}

function Login(req, res) {
  knex("users")
    .where({ username: req.body.username })
    .first()
    .then((users) => {
      if (!users) {
        res.status(401).json({
          status: "error",
          data: "No user by that name",
        });
      } else {
        return bcrypt
          .compare(req.body.password, users.password)
          .then((isAuthenticated) => {
            if (!isAuthenticated) {
              res.status(500).json({
                status: "error",
                data: "Unauthorized Access!",
              });
            } else {
              return jwt.sign(users, SECRET, (error, token) => {
                console.log(token)
                res.cookie("jwt", token, {
                  secure: true,
                  httpOnly: true,
                  maxAge: 2 * 60 * 60 * 1000,
                });
                res.status(200).json({
                  status: "ok",
                  data: token,
                });
              });
            }
          });
      }
    });
}

function ensureAuthenticated(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, SECRET, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        message: "Unauthorized Access!",
      });
    } else {
      res.status(200).json({
        status: "ok",
        data: {
          id: decodedToken.id,
          name: decodedToken.name,
          surname: decodedToken.surname,
          username: decodedToken.username,
          email: decodedToken.email,
          password: decodedToken.password,
          job_title: decodedToken.job_title,
        },
      });
    }
  });
}

module.exports = {
  createUser,
  Login,
  ensureAuthenticated,
};
