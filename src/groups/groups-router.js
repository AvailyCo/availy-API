const path = require('path');
const express = require('express');

const GroupService = require('./groups-service');

const groupsRouter = express.Router();
const jsonParser = express.json();

groupsRouter
  .route('/')
  .get((req, res, next) => {
    GroupService.getAllGroups(
      req.app.get('db')
    )
      .then(group => {
        res.json(group.map(GroupService.serializeGroup));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    // make group_images optional
    const { group_name, about_group, group_image, founder } = req.body;
    const newGroup = { group_name, about_group, group_image, founder };

    for (const [key, value] of Object.entries(newGroup)) {
      if (value == null) {
        return res
          .status(400)
          .json({
            error: `Missing '${key} in request body`
          })
      }
    }

    // newGroup.founder = req.user.userId;

    GroupService.insertGroup(
      req.app.get('db'),
      newGroup
    )
      .then(group => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${group.group_id}`))
          .json(GroupService.serializeGroup(group));
      })
      .catch(next);
  })

groupsRouter
  .route('/:groupId')
  .all(checkGroupExists)
  .get((req, res) => {
    res.json(GroupService.serializeGroup(res.group));
  })
  .patch(jsonParser, (req, res, next) => {
    const { group_name, group_image, about_group } = req.body;
    const groupPatch = { group_name, group_image, about_group };

    const numOfValues = Object.values(groupPatch);
    if (numOfValues === 0) {
      return res
        .status(400)
        .json({
          error: `Request body must contain either 'group_name', 'group_image', or 'about_group'`
        });
    }

    GroupService.patchGroup(
      req.app.get('db'),
      req.params.groupId,
      groupPatch
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    GroupService.deleteGroup(
      req.app.get('db'),
      req.params.groupId
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })


async function checkGroupExists(req, res, next) {
  try {
    const group = await GroupService.getGroupById(
      req.app.get('db'),
      req.params.groupId
    );

    if (!group) {
      return res.status(404).json({
        error: `Group doesn't exist`
      });
    }

    res.group = group;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = groupsRouter;