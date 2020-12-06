const path = require('path');
const express = require('express');

const MemberService = require('./members-service');

const membersRouter = express.Router();
const jsonParser = express.json();

membersRouter
  .route('/')
  .get((req, res, next) => {
    MemberService.getAllMembers(
      req.app.get('db')
    )
      .then(members => {
        res.json(members.map(MemberService.serializeMember));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { group_id, member_id, member_level } = req.body;
    const newMember = { group_id, member_id, member_level };

    for (const [key, value] of Object.entries(newMember)) {
      if (value == null) {
        return res
          .status(400)
          .json({
            error: `Missing '${key} in request body`
          })
      }
    }

    newMember.join_date = new Date();

    MemberService.addGroupMember(
      req.app.get('db'),
      newMember
    )
      .then(member => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${member.grpMemsId}`))
          .json(MemberService.serializeMember(member));
      })
      .catch(next);
  })


membersRouter
  .route('/:memberId')
  .all(checkMemberExists)
  .get((req, res) => {
    res.json(MemberService.serializeMember(res.member));
  })
  .patch(jsonParser, (req, res, next) => {
    const { member_level } = req.body;
    const memberPatch = { member_level };

    const numOfValues = Object.values(memberPatch);
    if (numOfValues === 0) {
      return res 
        .status(400)
        .json({
          error: `Request body must contain 'member_level'`
        });
    }

    MemberService.patchMember(
      req.app.get('db'),
      req.params.memberId,
      memberPatch
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete(( req, res, next) => {
    MemberService.removeMember(
      req.app.get('db'),
      req.params.memberId
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })


async function checkMemberExists(req, res, next) {
  try {
    const member = await MemberService.getMemberByID(
      req.app.get('db'),
      req.params.memberId
    );

    if (!member) {
      return res.status(404).json({
        error: `Member doesn't exist`
      });
    }

    res.member = member;
    next();
  } catch (error) {
    next(error);
  }
}


module.exports = membersRouter;