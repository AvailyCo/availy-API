const path = require('path')
const express = require('express')
const contactsService = require('./contacts-service');

const bodyParser = express.json();
const contactsRouter = express.Router();


contactsRouter
  .route('/')
  .get((req,res, next) => {
    contactsService.getAllContacts(
      req.app.get('db')
    )
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        next(err)});
  })
  .post(bodyParser, (req, res, next) => {
    let newContact = {
      user1_id: req.body.user1_id,
      user2_id: req.body.user2_id
    };  
    contactsService.addContact(req.app.get("db"), newContact)
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        next(err);
      });
  })

contactsRouter.route('/:userId')  
  .get(bodyParser, (req, res, next) => {
    let userId = req.params.userId;
    console.log(userId, "yooo")
    contactsService.getUserContacts(req.app.get("db"), userId)
      .then(contacts => {
        res.status(200).json(contacts);
      })
      .catch(err => {
        next(err);
      });
  })
  .patch(bodyParser, (req, res, next) => {
    // include "blocked" true or false in body
    let user1 = req.params.userId;
    let user2 = req.body.user2_id;
    let blockStatus = req.body.blocked;
    contactsService.getContactId(req.app.get("db"), user1, user2)
      .then(result => {
        contactsService.blockContact(req.app.get("db"), result[0].contactid, blockStatus, user1)
          .then(contacts => {
            res.status(200).json(contacts);
          }
          );
      })
      .catch(err => {
        next(err);
      }
      );
  })
  .delete(bodyParser, (req, res, next) => {
    let user1 = req.params.userId;
    let user2 = req.body.user2_id;
    contactsService.getContactId(req.app.get("db"), user1, user2)
      .then(result => {
        contactsService.deleteContact(req.app.get("db"), result[0].contactid)
          .then (contacts => {
            res.status(200).json(contacts);
          });
      })
      .catch(err => {
        next(err);
      });
  });

module.exports = contactsRouter;