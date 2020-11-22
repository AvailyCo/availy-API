const path = require('path')
const express = require('express')
const logger = require('../../logger');
const SunPMService = require('./sun-pm-service')
const { getDayValidationError } = require('../validate-day');

const SunPMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    sun_pm_id: day.sun_pm_id,
    sun_pm12: day.sun_pm12,
    sun_pm1230: day.sun_pm1230,
    sun_pm1: day.sun_pm1,
    sun_pm130: day.sun_pm130,
    sun_pm2: day.sun_pm2,
    sun_pm230: day.sun_pm230,
    sun_pm3: day.sun_pm3,
    sun_pm330: day.sun_pm330,
    sun_pm4: day.sun_pm4,
    sun_pm430: day.sun_pm430,
    sun_pm5: day.sun_pm5,
    sun_pm530: day.sun_pm530,
    sun_pm6: day.sun_pm6,
    sun_pm630: day.sun_pm630,
    sun_pm7: day.sun_pm7,
    sun_pm730: day.sun_pm730,
    sun_pm8: day.sun_pm8,
    sun_pm830: day.sun_pm830,
    sun_pm9: day.sun_pm9,
    sun_pm930: day.sun_pm930,
    sun_pm10: day.sun_pm10,
    sun_pm1030: day.sun_pm1030,
    sun_pm11: day.sun_pm11,
    sun_pm1130: day.sun_pm1130
});

SunPMRouter
    .route('/')
    .get((req, res, next) => {
        SunPMService.getAllSunPM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { sun_pm12, sun_pm1230, sun_pm1, sun_pm130, sun_pm2, sun_pm230, sun_pm3, sun_pm330, sun_pm4, sun_pm430, sun_pm5, sun_pm530, sun_pm6, sun_pm630, sun_pm7, sun_pm730, sun_pm8, sun_pm830, sun_pm9, sun_pm930, sun_pm10, sun_pm1030, sun_pm11, sun_pm1130 } = req.body
        const newDay = { sun_pm12, sun_pm1230, sun_pm1, sun_pm130, sun_pm2, sun_pm230, sun_pm3, sun_pm330, sun_pm4, sun_pm430, sun_pm5, sun_pm530, sun_pm6, sun_pm630, sun_pm7, sun_pm730, sun_pm8, sun_pm830, sun_pm9, sun_pm930, sun_pm10, sun_pm1030, sun_pm11, sun_pm1130 }

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

        SunPMService.insertSunPM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.sun_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

SunPMRouter
    .route('/:sun_pm_id')
    .all((req, res, next) => {
        SunPMService.getSunPMById(
            req.app.get('db'),
            req.params.sun_pm_id
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
        SunPMService.deleteSunPM(
            req.app.get('db'),
            req.params.sun_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { sun_pm12, sun_pm1230, sun_pm1, sun_pm130, sun_pm2, sun_pm230, sun_pm3, sun_pm330, sun_pm4, sun_pm430, sun_pm5, sun_pm530, sun_pm6, sun_pm630, sun_pm7, sun_pm730, sun_pm8, sun_pm830, sun_pm9, sun_pm930, sun_pm10, sun_pm1030, sun_pm11, sun_pm1130 } = req.body
        const updateDay = { sun_pm12, sun_pm1230, sun_pm1, sun_pm130, sun_pm2, sun_pm230, sun_pm3, sun_pm330, sun_pm4, sun_pm430, sun_pm5, sun_pm530, sun_pm6, sun_pm630, sun_pm7, sun_pm730, sun_pm8, sun_pm830, sun_pm9, sun_pm930, sun_pm10, sun_pm1030, sun_pm11, sun_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain sun_pm12, sun_pm1230, sun_pm1, sun_pm130, sun_pm2, sun_pm230, sun_pm3, sun_pm330, sun_pm4, sun_pm430, sun_pm5, sun_pm530, sun_pm6, sun_pm630, sun_pm7, sun_pm730, sun_pm8, sun_pm830, sun_pm9, sun_pm930, sun_pm10, sun_pm1030, sun_pm11, sun_pm1130`
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

        SunPMService.updateSunPM(
            req.app.get('db'),
            req.params.sun_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = SunPMRouter;