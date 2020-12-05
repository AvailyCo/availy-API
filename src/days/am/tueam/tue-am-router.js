const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const TueAMService = require('./tue-am-service');

const TueAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    tue_am_id: day.tue_am_id,
    tue_am12: day.tue_am12,
    tue_am1230: day.tue_am1230,
    tue_am1: day.tue_am1,
    tue_am130: day.tue_am130,
    tue_am2: day.tue_am2,
    tue_am230: day.tue_am230,
    tue_am3: day.tue_am3,
    tue_am330: day.tue_am330,
    tue_am4: day.tue_am4,
    tue_am430: day.tue_am430,
    tue_am5: day.tue_am5,
    tue_am530: day.tue_am530,
    tue_am6: day.tue_am6,
    tue_am630: day.tue_am630,
    tue_am7: day.tue_am7,
    tue_am730: day.tue_am730,
    tue_am8: day.tue_am8,
    tue_am830: day.tue_am830,
    tue_am9: day.tue_am9,
    tue_am930: day.tue_am930,
    tue_am10: day.tue_am10,
    tue_am1030: day.tue_am1030,
    tue_am11: day.tue_am11,
    tue_am1130: day.tue_am1130
});

TueAMRouter
    .route('/')
    .get((req, res, next) => {
        TueAMService.getAllTueAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { tue_am12, tue_am1230, tue_am1, tue_am130, tue_am2, tue_am230, tue_am3, tue_am330, tue_am4, tue_am430, tue_am5, tue_am530, tue_am6, tue_am630, tue_am7, tue_am730, tue_am8, tue_am830, tue_am9, tue_am930, tue_am10, tue_am1030, tue_am11, tue_am1130 } = req.body
        const newDay = { tue_am12, tue_am1230, tue_am1, tue_am130, tue_am2, tue_am230, tue_am3, tue_am330, tue_am4, tue_am430, tue_am5, tue_am530, tue_am6, tue_am630, tue_am7, tue_am730, tue_am8, tue_am830, tue_am9, tue_am930, tue_am10, tue_am1030, tue_am11, tue_am1130 }

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

        TueAMService.insertTueAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.tue_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

TueAMRouter
    .route('/:tue_am_id')
    .all((req, res, next) => {
        TueAMService.getTueAMById(
            req.app.get('db'),
            req.params.tue_am_id
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
        TueAMService.deleteTueAM(
            req.app.get('db'),
            req.params.tue_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { tue_am12, tue_am1230, tue_am1, tue_am130, tue_am2, tue_am230, tue_am3, tue_am330, tue_am4, tue_am430, tue_am5, tue_am530, tue_am6, tue_am630, tue_am7, tue_am730, tue_am8, tue_am830, tue_am9, tue_am930, tue_am10, tue_am1030, tue_am11, tue_am1130 } = req.body
        const updateDay = { tue_am12, tue_am1230, tue_am1, tue_am130, tue_am2, tue_am230, tue_am3, tue_am330, tue_am4, tue_am430, tue_am5, tue_am530, tue_am6, tue_am630, tue_am7, tue_am730, tue_am8, tue_am830, tue_am9, tue_am930, tue_am10, tue_am1030, tue_am11, tue_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain tue_am12, tue_am1230, tue_am1, tue_am130, tue_am2, tue_am230, tue_am3, tue_am330, tue_am4, tue_am430, tue_am5, tue_am530, tue_am6, tue_am630, tue_am7, tue_am730, tue_am8, tue_am830, tue_am9, tue_am930, tue_am10, tue_am1030, tue_am11, tue_am1130`
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

        TueAMService.updateTueAM(
            req.app.get('db'),
            req.params.tue_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = TueAMRouter;
