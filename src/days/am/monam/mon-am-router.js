const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const MonAMService = require('./mon-am-service')

const MonAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    mon_am_id: day.mon_am_id,
    mon_am12: day.mon_am12,
    mon_am1230: day.mon_am1230,
    mon_am1: day.mon_am1,
    mon_am130: day.mon_am130,
    mon_am2: day.mon_am2,
    mon_am230: day.mon_am230,
    mon_am3: day.mon_am3,
    mon_am330: day.mon_am330,
    mon_am4: day.mon_am4,
    mon_am430: day.mon_am430,
    mon_am5: day.mon_am5,
    mon_am530: day.mon_am530,
    mon_am6: day.mon_am6,
    mon_am630: day.mon_am630,
    mon_am7: day.mon_am7,
    mon_am730: day.mon_am730,
    mon_am8: day.mon_am8,
    mon_am830: day.mon_am830,
    mon_am9: day.mon_am9,
    mon_am930: day.mon_am930,
    mon_am10: day.mon_am10,
    mon_am1030: day.mon_am1030,
    mon_am11: day.mon_am11,
    mon_am1130: day.mon_am1130
});

MonAMRouter
    .route('/')
    .get((req, res, next) => {
        MonAMService.getAllMonAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { mon_am12, mon_am1230, mon_am1, mon_am130, mon_am2, mon_am230, mon_am3, mon_am330, mon_am4, mon_am430, mon_am5, mon_am530, mon_am6, mon_am630, mon_am7, mon_am730, mon_am8, mon_am830, mon_am9, mon_am930, mon_am10, mon_am1030, mon_am11, mon_am1130 } = req.body
        const newDay = { mon_am12, mon_am1230, mon_am1, mon_am130, mon_am2, mon_am230, mon_am3, mon_am330, mon_am4, mon_am430, mon_am5, mon_am530, mon_am6, mon_am630, mon_am7, mon_am730, mon_am8, mon_am830, mon_am9, mon_am930, mon_am10, mon_am1030, mon_am11, mon_am1130 }

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

        MonAMService.insertMonAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.mon_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

MonAMRouter
    .route('/:mon_am_id')
    .all((req, res, next) => {
        MonAMService.getMonAMById(
            req.app.get('db'),
            req.params.mon_am_id
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
        MonAMService.deleteMonAM(
            req.app.get('db'),
            req.params.mon_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { mon_am12, mon_am1230, mon_am1, mon_am130, mon_am2, mon_am230, mon_am3, mon_am330, mon_am4, mon_am430, mon_am5, mon_am530, mon_am6, mon_am630, mon_am7, mon_am730, mon_am8, mon_am830, mon_am9, mon_am930, mon_am10, mon_am1030, mon_am11, mon_am1130 } = req.body
        const updateDay = { mon_am12, mon_am1230, mon_am1, mon_am130, mon_am2, mon_am230, mon_am3, mon_am330, mon_am4, mon_am430, mon_am5, mon_am530, mon_am6, mon_am630, mon_am7, mon_am730, mon_am8, mon_am830, mon_am9, mon_am930, mon_am10, mon_am1030, mon_am11, mon_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain mon_am12, mon_am1230, mon_am1, mon_am130, mon_am2, mon_am230, mon_am3, mon_am330, mon_am4, mon_am430, mon_am5, mon_am530, mon_am6, mon_am630, mon_am7, mon_am730, mon_am8, mon_am830, mon_am9, mon_am930, mon_am10, mon_am1030, mon_am11, mon_am1130`
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

        MonAMService.updateMonAM(
            req.app.get('db'),
            req.params.mon_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = MonAMRouter;