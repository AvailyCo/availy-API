const path = require('path')
const express = require('express')

const UsersService = require('./users-service');

const bodyParser = express.json();
const usersRouter = express.Router();

usersRouter
  .route('/')
  .get((req, res, next) => {
    UsersService.getAllUsers(
      req.app.get('db')
    )
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        next(err)});
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
    let isValidUserName = UsersService.validateName(username);
    let isValidFirstName = UsersService.validateName(firstname);
    let isValidLastName = UsersService.validateName(lastname);
    let isValidEmail = UsersService.validateEmail(email);
    let isValidAboutMe =
    UsersService.validateAboutMe(aboutme);
    let isValidTimeZone = 
    UsersService.validateTimeZone(timezone);
    let isValidWeekId = UsersService.validateWeekId(weekid);

    if(isValidPassword) {
      return res.status(400).json({isValidPassword});
    }
    if(isValidUserName) {
      return res.status(400).json({isValidUserName});
    }
    if(isValidFirstName) {
      return res.status(400).json({isValidFirstName});
    }
    if(isValidLastName) {
      return res.status(400).json({isValidLastName});
    }
    if(isValidEmail) {
      return res.status(400).json({isValidEmail});
    }
    if(isValidAboutMe) {
      return res.status(400).json({isValidAboutMe});
    }
    if(isValidTimeZone) {
      return res.status(400).json({isValidTimeZone});
    }
    if(isValidWeekId) {
      return res.status(400).json({isValidWeekId});
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
  });
  
usersRouter
  .route('/:userId')
  .get(bodyParser, (req, res, next) => {
    let userId = req.params.userId;
    UsersService.getById(req.app.get("db"), userId)
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        next(err);
      });
  })
  .patch(bodyParser, (req, res, next) => {
    let userId = req.params.userId;
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
    let newUserFields = {
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
    let isValidPassword = UsersService.validatePassword(password);
    let isValidUserName = UsersService.validateName(username);
    let isValidFirstName = UsersService.validateName(firstname);
    let isValidLastName = UsersService.validateName(lastname);
    let isValidEmail = UsersService.validateEmail(email);
    let isValidAboutMe =
    UsersService.validateAboutMe(aboutme);
    let isValidTimeZone = 
    UsersService.validateTimeZone(timezone);
    let isValidWeekId = UsersService.validateWeekId(weekid);

    if(isValidPassword) {
      return res.status(400).json({isValidPassword});
    }
    if(isValidUserName) {
      return res.status(400).json({isValidUserName});
    }
    if(isValidFirstName) {
      return res.status(400).json({isValidFirstName});
    }
    if(isValidLastName) {
      return res.status(400).json({isValidLastName});
    }
    if(isValidEmail) {
      return res.status(400).json({isValidEmail});
    }
    if(isValidAboutMe) {
      return res.status(400).json({isValidAboutMe});
    }
    if(isValidTimeZone) {
      return res.status(400).json({isValidTimeZone});
    }
    if(isValidWeekId) {
      return res.status(400).json({isValidWeekId});
    }
    else {
      UsersService.patchUser(req.app.get('db'), userId, newUserFields)
        .then(users => {
          res.status(200).json(users)
        })
        .catch(err => {
          next(err);
        })
    }
  })
  .delete(bodyParser, (req, res, next) => {
    let userId = req.params.userId;
    UsersService.deleteUser(req.app.get("db"), userId)
      .then( user => {
        res.status(200).json(user);
      })
      .catch(err => {
        next(err);
      });
  });
  

module.exports = usersRouter;