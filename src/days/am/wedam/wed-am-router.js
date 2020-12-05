const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const WedAMService = require('./wed-am-service');

const WedAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    wed_am_id: day.wed_am_id,
    wed_am12: day.wed_am12,
    wed_am1230: day.wed_am1230,
    wed_am1: day.wed_am1,
    wed_am130: day.wed_am130,
    wed_am2: day.wed_am2,
    wed_am230: day.wed_am230,
    wed_am3: day.wed_am3,
    wed_am330: day.wed_am330,
    wed_am4: day.wed_am4,
    wed_am430: day.wed_am430,
    wed_am5: day.wed_am5,
    wed_am530: day.wed_am530,
    wed_am6: day.wed_am6,
    wed_am630: day.wed_am630,
    wed_am7: day.wed_am7,
    wed_am730: day.wed_am730,
    wed_am8: day.wed_am8,
    wed_am830: day.wed_am830,
    wed_am9: day.wed_am9,
    wed_am930: day.wed_am930,
    wed_am10: day.wed_am10,
    wed_am1030: day.wed_am1030,
    wed_am11: day.wed_am11,
    wed_am1130: day.wed_am1130
});

WedAMRouter
    .route('/')
    .get((req, res, next) => {
        WedAMService.getAllWedAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { wed_am12, wed_am1230, wed_am1, wed_am130, wed_am2, wed_am230, wed_am3, wed_am330, wed_am4, wed_am430, wed_am5, wed_am530, wed_am6, wed_am630, wed_am7, wed_am730, wed_am8, wed_am830, wed_am9, wed_am930, wed_am10, wed_am1030, wed_am11, wed_am1130 } = req.body
        const newDay = { wed_am12, wed_am1230, wed_am1, wed_am130, wed_am2, wed_am230, wed_am3, wed_am330, wed_am4, wed_am430, wed_am5, wed_am530, wed_am6, wed_am630, wed_am7, wed_am730, wed_am8, wed_am830, wed_am9, wed_am930, wed_am10, wed_am1030, wed_am11, wed_am1130 }

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

        WedAMService.insertWedAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.wed_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

WedAMRouter
    .route('/:wed_am_id')
    .all((req, res, next) => {
        WedAMService.getWedAMById(
            req.app.get('db'),
            req.params.wed_am_id
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
        WedAMService.deleteWedAM(
            req.app.get('db'),
            req.params.wed_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { wed_am12, wed_am1230, wed_am1, wed_am130, wed_am2, wed_am230, wed_am3, wed_am330, wed_am4, wed_am430, wed_am5, wed_am530, wed_am6, wed_am630, wed_am7, wed_am730, wed_am8, wed_am830, wed_am9, wed_am930, wed_am10, wed_am1030, wed_am11, wed_am1130 } = req.body
        const updateDay = { wed_am12, wed_am1230, wed_am1, wed_am130, wed_am2, wed_am230, wed_am3, wed_am330, wed_am4, wed_am430, wed_am5, wed_am530, wed_am6, wed_am630, wed_am7, wed_am730, wed_am8, wed_am830, wed_am9, wed_am930, wed_am10, wed_am1030, wed_am11, wed_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain wed_am12, wed_am1230, wed_am1, wed_am130, wed_am2, wed_am230, wed_am3, wed_am330, wed_am4, wed_am430, wed_am5, wed_am530, wed_am6, wed_am630, wed_am7, wed_am730, wed_am8, wed_am830, wed_am9, wed_am930, wed_am10, wed_am1030, wed_am11, wed_am1130`
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

        WedAMService.updateWedAM(
            req.app.get('db'),
            req.params.wed_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = WedAMRouter;
