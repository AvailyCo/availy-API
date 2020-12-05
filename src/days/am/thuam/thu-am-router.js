const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const ThuAMService = require('./thu-am-service')

const ThuAMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    thu_am_id: day.thu_am_id,
    thu_am12: day.thu_am12,
    thu_am1230: day.thu_am1230,
    thu_am1: day.thu_am1,
    thu_am130: day.thu_am130,
    thu_am2: day.thu_am2,
    thu_am230: day.thu_am230,
    thu_am3: day.thu_am3,
    thu_am330: day.thu_am330,
    thu_am4: day.thu_am4,
    thu_am430: day.thu_am430,
    thu_am5: day.thu_am5,
    thu_am530: day.thu_am530,
    thu_am6: day.thu_am6,
    thu_am630: day.thu_am630,
    thu_am7: day.thu_am7,
    thu_am730: day.thu_am730,
    thu_am8: day.thu_am8,
    thu_am830: day.thu_am830,
    thu_am9: day.thu_am9,
    thu_am930: day.thu_am930,
    thu_am10: day.thu_am10,
    thu_am1030: day.thu_am1030,
    thu_am11: day.thu_am11,
    thu_am1130: day.thu_am1130
});

ThuAMRouter
    .route('/')
    .get((req, res, next) => {
        ThuAMService.getAllThuAM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { thu_am12, thu_am1230, thu_am1, thu_am130, thu_am2, thu_am230, thu_am3, thu_am330, thu_am4, thu_am430, thu_am5, thu_am530, thu_am6, thu_am630, thu_am7, thu_am730, thu_am8, thu_am830, thu_am9, thu_am930, thu_am10, thu_am1030, thu_am11, thu_am1130 } = req.body
        const newDay = { thu_am12, thu_am1230, thu_am1, thu_am130, thu_am2, thu_am230, thu_am3, thu_am330, thu_am4, thu_am430, thu_am5, thu_am530, thu_am6, thu_am630, thu_am7, thu_am730, thu_am8, thu_am830, thu_am9, thu_am930, thu_am10, thu_am1030, thu_am11, thu_am1130 }

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

        ThuAMService.insertThuAM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.thu_am_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

ThuAMRouter
    .route('/:thu_am_id')
    .all((req, res, next) => {
        ThuAMService.getThuAMById(
            req.app.get('db'),
            req.params.thu_am_id
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
        ThuAMService.deleteThuAM(
            req.app.get('db'),
            req.params.thu_am_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { thu_am12, thu_am1230, thu_am1, thu_am130, thu_am2, thu_am230, thu_am3, thu_am330, thu_am4, thu_am430, thu_am5, thu_am530, thu_am6, thu_am630, thu_am7, thu_am730, thu_am8, thu_am830, thu_am9, thu_am930, thu_am10, thu_am1030, thu_am11, thu_am1130 } = req.body
        const updateDay = { thu_am12, thu_am1230, thu_am1, thu_am130, thu_am2, thu_am230, thu_am3, thu_am330, thu_am4, thu_am430, thu_am5, thu_am530, thu_am6, thu_am630, thu_am7, thu_am730, thu_am8, thu_am830, thu_am9, thu_am930, thu_am10, thu_am1030, thu_am11, thu_am1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain thu_am12, thu_am1230, thu_am1, thu_am130, thu_am2, thu_am230, thu_am3, thu_am330, thu_am4, thu_am430, thu_am5, thu_am530, thu_am6, thu_am630, thu_am7, thu_am730, thu_am8, thu_am830, thu_am9, thu_am930, thu_am10, thu_am1030, thu_am11, thu_am1130`
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

        ThuAMService.updateThuAM(
            req.app.get('db'),
            req.params.thu_am_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = ThuAMRouter;