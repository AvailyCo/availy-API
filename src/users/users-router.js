const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger');
const UsersService = require('./users-service');

const bodyParser = express.json();
const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(bodyParser, (req, res, next) => {
    let userId = req.body.userid;
    UsersService.getById(req.app.get("db"), userId)
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        next(err);
      });
  })
  .post(bodyParser, (req, res, next) => {
    let {
      username,
      firstname,
      lastname,
      email,
      password,
      aboutme,
      avatar,
      timezone,
      weekid
    } = req.body;
    const newUser = {
      username,
      firstname,
      lastname,
      password,
      email,
      aboutme,
      avatar,
      timezone,
      weekid,
    };
    let isValidPassword = UsersService.validatePassword(password);
    if(isValidPassword) {
      return res.status(400).json({isValidPassword});
    }
    else {
      UsersService.insertUser(req.app.get("db"), newUser)
        .then(users => {
          res.status(200).json(users)
        })
        .catch(err => {
          next(err);
        });
    }
  })
  .patch(bodyParser, (req, res, next) => {
    let {
      userid,
      username,
      firstname,
      lastname,
      email,
      password,
      aboutme,
      avatar,
      timezone,
      weekid
    } = req.body;
    let newUserFields = {
      userid,
      username,
      firstname,
      lastname,
      email,
      password,
      aboutme,
      avatar,
      timezone,
      weekid
    };

    UsersService.patchUser(req.app.get('db'), userid, newUserFields)
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        next(err);
      })
      
  })
  .delete(bodyParser, (req, res, next) => {
    let username = req.body.username;
    UsersService.deleteUser(req.app.get("db"), username)
      .then( user => {
        res.status(200).json(user);
      })
      .catch(err => {
        next(err);
      });
  });

module.exports = usersRouter;