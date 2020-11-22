const path = require('path')
const express = require('express')
const logger = require('../../logger');
const TuePMService = require('./tue-pm-service')
const { getDayValidationError } = require('../validate-day');

const TuePMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    tue_pm_id: day.tue_pm_id,
    tue_pm12: day.tue_pm12,
    tue_pm1230: day.tue_pm1230,
    tue_pm1: day.tue_pm1,
    tue_pm130: day.tue_pm130,
    tue_pm2: day.tue_pm2,
    tue_pm230: day.tue_pm230,
    tue_pm3: day.tue_pm3,
    tue_pm330: day.tue_pm330,
    tue_pm4: day.tue_pm4,
    tue_pm430: day.tue_pm430,
    tue_pm5: day.tue_pm5,
    tue_pm530: day.tue_pm530,
    tue_pm6: day.tue_pm6,
    tue_pm630: day.tue_pm630,
    tue_pm7: day.tue_pm7,
    tue_pm730: day.tue_pm730,
    tue_pm8: day.tue_pm8,
    tue_pm830: day.tue_pm830,
    tue_pm9: day.tue_pm9,
    tue_pm930: day.tue_pm930,
    tue_pm10: day.tue_pm10,
    tue_pm1030: day.tue_pm1030,
    tue_pm11: day.tue_pm11,
    tue_pm1130: day.tue_pm1130
});

TuePMRouter
    .route('/')
    .get((req, res, next) => {
        TuePMService.getAllTuePM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { tue_pm12, tue_pm1230, tue_pm1, tue_pm130, tue_pm2, tue_pm230, tue_pm3, tue_pm330, tue_pm4, tue_pm430, tue_pm5, tue_pm530, tue_pm6, tue_pm630, tue_pm7, tue_pm730, tue_pm8, tue_pm830, tue_pm9, tue_pm930, tue_pm10, tue_pm1030, tue_pm11, tue_pm1130 } = req.body
        const newDay = { tue_pm12, tue_pm1230, tue_pm1, tue_pm130, tue_pm2, tue_pm230, tue_pm3, tue_pm330, tue_pm4, tue_pm430, tue_pm5, tue_pm530, tue_pm6, tue_pm630, tue_pm7, tue_pm730, tue_pm8, tue_pm830, tue_pm9, tue_pm930, tue_pm10, tue_pm1030, tue_pm11, tue_pm1130 }

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

        TuePMService.insertTuePM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.tue_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

TuePMRouter
    .route('/:tue_pm_id')
    .all((req, res, next) => {
        TuePMService.getTuePMById(
            req.app.get('db'),
            req.params.tue_pm_id
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
        TuePMService.deleteTuePM(
            req.app.get('db'),
            req.params.tue_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { tue_pm12, tue_pm1230, tue_pm1, tue_pm130, tue_pm2, tue_pm230, tue_pm3, tue_pm330, tue_pm4, tue_pm430, tue_pm5, tue_pm530, tue_pm6, tue_pm630, tue_pm7, tue_pm730, tue_pm8, tue_pm830, tue_pm9, tue_pm930, tue_pm10, tue_pm1030, tue_pm11, tue_pm1130 } = req.body
        const updateDay = { tue_pm12, tue_pm1230, tue_pm1, tue_pm130, tue_pm2, tue_pm230, tue_pm3, tue_pm330, tue_pm4, tue_pm430, tue_pm5, tue_pm530, tue_pm6, tue_pm630, tue_pm7, tue_pm730, tue_pm8, tue_pm830, tue_pm9, tue_pm930, tue_pm10, tue_pm1030, tue_pm11, tue_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain tue_pm12, tue_pm1230, tue_pm1, tue_pm130, tue_pm2, tue_pm230, tue_pm3, tue_pm330, tue_pm4, tue_pm430, tue_pm5, tue_pm530, tue_pm6, tue_pm630, tue_pm7, tue_pm730, tue_pm8, tue_pm830, tue_pm9, tue_pm930, tue_pm10, tue_pm1030, tue_pm11, tue_pm1130`
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

        TuePMService.updateTuePM(
            req.app.get('db'),
            req.params.tue_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = TuePMRouter;
