const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const SunAMService = require('./sun-am-service');

const SunAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    sun_am_id: day.sun_am_id,
    sun_am12: day.sun_am12,
    sun_am1230: day.sun_am1230,
    sun_am1: day.sun_am1,
    sun_am130: day.sun_am130,
    sun_am2: day.sun_am2,
    sun_am230: day.sun_am230,
    sun_am3: day.sun_am3,
    sun_am330: day.sun_am330,
    sun_am4: day.sun_am4,
    sun_am430: day.sun_am430,
    sun_am5: day.sun_am5,
    sun_am530: day.sun_am530,
    sun_am6: day.sun_am6,
    sun_am630: day.sun_am630,
    sun_am7: day.sun_am7,
    sun_am730: day.sun_am730,
    sun_am8: day.sun_am8,
    sun_am830: day.sun_am830,
    sun_am9: day.sun_am9,
    sun_am930: day.sun_am930,
    sun_am10: day.sun_am10,
    sun_am1030: day.sun_am1030,
    sun_am11: day.sun_am11,
    sun_am1130: day.sun_am1130
});

SunAMRouter
    .route('/')
    .get((req, res, next) => {
        SunAMService.getAllSunAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { sun_am12, sun_am1230, sun_am1, sun_am130, sun_am2, sun_am230, sun_am3, sun_am330, sun_am4, sun_am430, sun_am5, sun_am530, sun_am6, sun_am630, sun_am7, sun_am730, sun_am8, sun_am830, sun_am9, sun_am930, sun_am10, sun_am1030, sun_am11, sun_am1130 } = req.body
        const newDay = { sun_am12, sun_am1230, sun_am1, sun_am130, sun_am2, sun_am230, sun_am3, sun_am330, sun_am4, sun_am430, sun_am5, sun_am530, sun_am6, sun_am630, sun_am7, sun_am730, sun_am8, sun_am830, sun_am9, sun_am930, sun_am10, sun_am1030, sun_am11, sun_am1130 }

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

        SunAMService.insertSunAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.sun_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

SunAMRouter
    .route('/:sun_am_id')
    .all((req, res, next) => {
        SunAMService.getSunAMById(
            req.app.get('db'),
            req.params.sun_am_id
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
        SunAMService.deleteSunAM(
            req.app.get('db'),
            req.params.sun_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { sun_am12, sun_am1230, sun_am1, sun_am130, sun_am2, sun_am230, sun_am3, sun_am330, sun_am4, sun_am430, sun_am5, sun_am530, sun_am6, sun_am630, sun_am7, sun_am730, sun_am8, sun_am830, sun_am9, sun_am930, sun_am10, sun_am1030, sun_am11, sun_am1130 } = req.body
        const updateDay = { sun_am12, sun_am1230, sun_am1, sun_am130, sun_am2, sun_am230, sun_am3, sun_am330, sun_am4, sun_am430, sun_am5, sun_am530, sun_am6, sun_am630, sun_am7, sun_am730, sun_am8, sun_am830, sun_am9, sun_am930, sun_am10, sun_am1030, sun_am11, sun_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain sun_am12, sun_am1230, sun_am1, sun_am130, sun_am2, sun_am230, sun_am3, sun_am330, sun_am4, sun_am430, sun_am5, sun_am530, sun_am6, sun_am630, sun_am7, sun_am730, sun_am8, sun_am830, sun_am9, sun_am930, sun_am10, sun_am1030, sun_am11, sun_am1130`
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

        SunAMService.updateSunAM(
            req.app.get('db'),
            req.params.sun_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = SunAMRouter;