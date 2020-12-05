const path = require('path')
const express = require('express')
const FriAMService = require('./fri-am-service');
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');

const FriAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    fri_am_id: day.fri_am_id,
    fri_am12: day.fri_am12,
    fri_am1230: day.fri_am1230,
    fri_am1: day.fri_am1,
    fri_am130: day.fri_am130,
    fri_am2: day.fri_am2,
    fri_am230: day.fri_am230,
    fri_am3: day.fri_am3,
    fri_am330: day.fri_am330,
    fri_am4: day.fri_am4,
    fri_am430: day.fri_am430,
    fri_am5: day.fri_am5,
    fri_am530: day.fri_am530,
    fri_am6: day.fri_am6,
    fri_am630: day.fri_am630,
    fri_am7: day.fri_am7,
    fri_am730: day.fri_am730,
    fri_am8: day.fri_am8,
    fri_am830: day.fri_am830,
    fri_am9: day.fri_am9,
    fri_am930: day.fri_am930,
    fri_am10: day.fri_am10,
    fri_am1030: day.fri_am1030,
    fri_am11: day.fri_am11,
    fri_am1130: day.fri_am1130
});

FriAMRouter
    .route('/')
    .get((req, res, next) => {
        FriAMService.getAllFriAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { fri_am12, fri_am1230, fri_am1, fri_am130, fri_am2, fri_am230, fri_am3, fri_am330, fri_am4, fri_am430, fri_am5, fri_am530, fri_am6, fri_am630, fri_am7, fri_am730, fri_am8, fri_am830, fri_am9, fri_am930, fri_am10, fri_am1030, fri_am11, fri_am1130 } = req.body
        const newDay = { fri_am12, fri_am1230, fri_am1, fri_am130, fri_am2, fri_am230, fri_am3, fri_am330, fri_am4, fri_am430, fri_am5, fri_am530, fri_am6, fri_am630, fri_am7, fri_am730, fri_am8, fri_am830, fri_am9, fri_am930, fri_am10, fri_am1030, fri_am11, fri_am1130 }

        for (const [key, value] of Object.entries(newDay)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            }
        }

        const error = getDayValidationError(newDay);
        if (error) {
            logger.error({
                message: `POST Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        FriAMService.insertFriAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.fri_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

FriAMRouter
    .route('/:fri_am_id')
    .all((req, res, next) => {
        FriAMService.getFriAMById(
            req.app.get('db'),
            req.params.fri_am_id
        )
            .then(oneDay => {
                if (!oneDay) {
                    return res.status(404).json({
                        error: { message: `AM Day does not exist` }
                    })
                }
                res.oneDay = oneDay
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(getDay(res.oneDay))
    })

    .delete((req, res, next) => {
        FriAMService.deleteFriAM(
            req.app.get('db'),
            req.params.fri_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { fri_am12, fri_am1230, fri_am1, fri_am130, fri_am2, fri_am230, fri_am3, fri_am330, fri_am4, fri_am430, fri_am5, fri_am530, fri_am6, fri_am630, fri_am7, fri_am730, fri_am8, fri_am830, fri_am9, fri_am930, fri_am10, fri_am1030, fri_am11, fri_am1130 } = req.body
        const updateDay = { fri_am12, fri_am1230, fri_am1, fri_am130, fri_am2, fri_am230, fri_am3, fri_am330, fri_am4, fri_am430, fri_am5, fri_am530, fri_am6, fri_am630, fri_am7, fri_am730, fri_am8, fri_am830, fri_am9, fri_am930, fri_am10, fri_am1030, fri_am11, fri_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain fri_am12, fri_am1230, fri_am1, fri_am130, fri_am2, fri_am230, fri_am3, fri_am330, fri_am4, fri_am430, fri_am5, fri_am530, fri_am6, fri_am630, fri_am7, fri_am730, fri_am8, fri_am830, fri_am9, fri_am930, fri_am10, fri_am1030, fri_am11, fri_am1130`
                }
            });
        }

        const error = getDayValidationError(updateDay);
        if (error) {
            logger.error({
                message: `POST Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        FriAMService.updateFriAM(
            req.app.get('db'),
            req.params.fri_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = FriAMRouter;