const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const SatAMService = require('./sat-am-service');

const SatAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    sat_am_id: day.sat_am_id,
    sat_am12: day.sat_am12,
    sat_am1230: day.sat_am1230,
    sat_am1: day.sat_am1,
    sat_am130: day.sat_am130,
    sat_am2: day.sat_am2,
    sat_am230: day.sat_am230,
    sat_am3: day.sat_am3,
    sat_am330: day.sat_am330,
    sat_am4: day.sat_am4,
    sat_am430: day.sat_am430,
    sat_am5: day.sat_am5,
    sat_am530: day.sat_am530,
    sat_am6: day.sat_am6,
    sat_am630: day.sat_am630,
    sat_am7: day.sat_am7,
    sat_am730: day.sat_am730,
    sat_am8: day.sat_am8,
    sat_am830: day.sat_am830,
    sat_am9: day.sat_am9,
    sat_am930: day.sat_am930,
    sat_am10: day.sat_am10,
    sat_am1030: day.sat_am1030,
    sat_am11: day.sat_am11,
    sat_am1130: day.sat_am1130
});

SatAMRouter
    .route('/')
    .get((req, res, next) => {
        SatAMService.getAllSatAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { sat_am12, sat_am1230, sat_am1, sat_am130, sat_am2, sat_am230, sat_am3, sat_am330, sat_am4, sat_am430, sat_am5, sat_am530, sat_am6, sat_am630, sat_am7, sat_am730, sat_am8, sat_am830, sat_am9, sat_am930, sat_am10, sat_am1030, sat_am11, sat_am1130 } = req.body
        const newDay = { sat_am12, sat_am1230, sat_am1, sat_am130, sat_am2, sat_am230, sat_am3, sat_am330, sat_am4, sat_am430, sat_am5, sat_am530, sat_am6, sat_am630, sat_am7, sat_am730, sat_am8, sat_am830, sat_am9, sat_am930, sat_am10, sat_am1030, sat_am11, sat_am1130 }

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

        SatAMService.insertSatAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.sat_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

SatAMRouter
    .route('/:sat_am_id')
    .all((req, res, next) => {
        SatAMService.getSatAMById(
            req.app.get('db'),
            req.params.sat_am_id
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
        SatAMService.deleteSatAM(
            req.app.get('db'),
            req.params.sat_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { sat_am12, sat_am1230, sat_am1, sat_am130, sat_am2, sat_am230, sat_am3, sat_am330, sat_am4, sat_am430, sat_am5, sat_am530, sat_am6, sat_am630, sat_am7, sat_am730, sat_am8, sat_am830, sat_am9, sat_am930, sat_am10, sat_am1030, sat_am11, sat_am1130 } = req.body
        const updateDay = { sat_am12, sat_am1230, sat_am1, sat_am130, sat_am2, sat_am230, sat_am3, sat_am330, sat_am4, sat_am430, sat_am5, sat_am530, sat_am6, sat_am630, sat_am7, sat_am730, sat_am8, sat_am830, sat_am9, sat_am930, sat_am10, sat_am1030, sat_am11, sat_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain sat_am12, sat_am1230, sat_am1, sat_am130, sat_am2, sat_am230, sat_am3, sat_am330, sat_am4, sat_am430, sat_am5, sat_am530, sat_am6, sat_am630, sat_am7, sat_am730, sat_am8, sat_am830, sat_am9, sat_am930, sat_am10, sat_am1030, sat_am11, sat_am1130`
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

        SatAMService.updateSatAM(
            req.app.get('db'),
            req.params.sat_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = SatAMRouter;