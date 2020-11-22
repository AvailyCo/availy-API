const path = require('path')
const express = require('express')
const logger = require('../../logger');
const ThuPMService = require('./thu-pm-service')
const { getDayValidationError } = require('../validate-day');

const ThuPMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    thu_pm_id: day.thu_PM_Id,
    thu_pm12: day.thu_pm12,
    thu_pm1230: day.thu_pm1230,
    thu_pm1: day.thu_pm1,
    thu_pm130: day.thu_pm130,
    thu_pm2: day.thu_pm2,
    thu_pm230: day.thu_pm230,
    thu_pm3: day.thu_pm3,
    thu_pm330: day.thu_pm330,
    thu_pm4: day.thu_pm4,
    thu_pm430: day.thu_pm430,
    thu_pm5: day.thu_pm5,
    thu_pm530: day.thu_pm530,
    thu_pm6: day.thu_pm6,
    thu_pm630: day.thu_pm630,
    thu_pm7: day.thu_pm7,
    thu_pm730: day.thu_pm730,
    thu_pm8: day.thu_pm8,
    thu_pm830: day.thu_pm830,
    thu_pm9: day.thu_pm9,
    thu_pm930: day.thu_pm930,
    thu_pm10: day.thu_pm10,
    thu_pm1030: day.thu_pm1030,
    thu_pm11: day.thu_pm11,
    thu_pm1130: day.thu_pm1130
});

ThuPMRouter
    .route('/')
    .get((req, res, next) => {
        ThuPMService.getAllThuPM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { thu_pm12, thu_pm1230, thu_pm1, thu_pm130, thu_pm2, thu_pm230, thu_pm3, thu_pm330, thu_pm4, thu_pm430, thu_pm5, thu_pm530, thu_pm6, thu_pm630, thu_pm7, thu_pm730, thu_pm8, thu_pm830, thu_pm9, thu_pm930, thu_pm10, thu_pm1030, thu_pm11, thu_pm1130 } = req.body
        const newDay = { thu_pm12, thu_pm1230, thu_pm1, thu_pm130, thu_pm2, thu_pm230, thu_pm3, thu_pm330, thu_pm4, thu_pm430, thu_pm5, thu_pm530, thu_pm6, thu_pm630, thu_pm7, thu_pm730, thu_pm8, thu_pm830, thu_pm9, thu_pm930, thu_pm10, thu_pm1030, thu_pm11, thu_pm1130 }

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

        ThuPMService.insertThuPM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.thu_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

ThuPMRouter
    .route('/:thu_pm_id')
    .all((req, res, next) => {
        ThuPMService.getThuPMById(
            req.app.get('db'),
            req.params.thu_pm_id
        )
            .then(oneDay => {
                if (!oneDay) {
                    return res.status(404).json({
                        error: { message: `PM Day does not exist` }
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
        ThuPMService.deleteThuPM(
            req.app.get('db'),
            req.params.thu_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { thu_pm12, thu_pm1230, thu_pm1, thu_pm130, thu_pm2, thu_pm230, thu_pm3, thu_pm330, thu_pm4, thu_pm430, thu_pm5, thu_pm530, thu_pm6, thu_pm630, thu_pm7, thu_pm730, thu_pm8, thu_pm830, thu_pm9, thu_pm930, thu_pm10, thu_pm1030, thu_pm11, thu_pm1130 } = req.body
        const updateDay = { thu_pm12, thu_pm1230, thu_pm1, thu_pm130, thu_pm2, thu_pm230, thu_pm3, thu_pm330, thu_pm4, thu_pm430, thu_pm5, thu_pm530, thu_pm6, thu_pm630, thu_pm7, thu_pm730, thu_pm8, thu_pm830, thu_pm9, thu_pm930, thu_pm10, thu_pm1030, thu_pm11, thu_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain thu_pm12, thu_pm1230, thu_pm1, thu_pm130, thu_pm2, thu_pm230, thu_pm3, thu_pm330, thu_pm4, thu_pm430, thu_pm5, thu_pm530, thu_pm6, thu_pm630, thu_pm7, thu_pm730, thu_pm8, thu_pm830, thu_pm9, thu_pm930, thu_pm10, thu_pm1030, thu_pm11, thu_pm1130`
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

        ThuPMService.updateThuPM(
            req.app.get('db'),
            req.params.thu_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = ThuPMRouter;