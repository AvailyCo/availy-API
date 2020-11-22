const path = require('path')
const express = require('express')
const logger = require('../../logger');
const SatPMService = require('./sat-pm-service')
const { getDayValidationError } = require('../validate-day');

const SatPMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    sat_pm_id: day.sat_PM_Id,
    sat_pm12: day.sat_pm12,
    sat_pm1230: day.sat_pm1230,
    sat_pm1: day.sat_pm1,
    sat_pm130: day.sat_pm130,
    sat_pm2: day.sat_pm2,
    sat_pm230: day.sat_pm230,
    sat_pm3: day.sat_pm3,
    sat_pm330: day.sat_pm330,
    sat_pm4: day.sat_pm4,
    sat_pm430: day.sat_pm430,
    sat_pm5: day.sat_pm5,
    sat_pm530: day.sat_pm530,
    sat_pm6: day.sat_pm6,
    sat_pm630: day.sat_pm630,
    sat_pm7: day.sat_pm7,
    sat_pm730: day.sat_pm730,
    sat_pm8: day.sat_pm8,
    sat_pm830: day.sat_pm830,
    sat_pm9: day.sat_pm9,
    sat_pm930: day.sat_pm930,
    sat_pm10: day.sat_pm10,
    sat_pm1030: day.sat_pm1030,
    sat_pm11: day.sat_pm11,
    sat_pm1130: day.sat_pm1130
});

SatPMRouter
    .route('/')
    .get((req, res, next) => {
        SatPMService.getAllSatPM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { sat_pm12, sat_pm1230, sat_pm1, sat_pm130, sat_pm2, sat_pm230, sat_pm3, sat_pm330, sat_pm4, sat_pm430, sat_pm5, sat_pm530, sat_pm6, sat_pm630, sat_pm7, sat_pm730, sat_pm8, sat_pm830, sat_pm9, sat_pm930, sat_pm10, sat_pm1030, sat_pm11, sat_pm1130 } = req.body
        const newDay = { sat_pm12, sat_pm1230, sat_pm1, sat_pm130, sat_pm2, sat_pm230, sat_pm3, sat_pm330, sat_pm4, sat_pm430, sat_pm5, sat_pm530, sat_pm6, sat_pm630, sat_pm7, sat_pm730, sat_pm8, sat_pm830, sat_pm9, sat_pm930, sat_pm10, sat_pm1030, sat_pm11, sat_pm1130 }

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

        SatPMService.insertSatPM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.sat_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

SatPMRouter
    .route('/:sat_pm_id')
    .all((req, res, next) => {
        SatPMService.getSatPMById(
            req.app.get('db'),
            req.params.sat_pm_id
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
        SatPMService.deleteSatPM(
            req.app.get('db'),
            req.params.sat_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { sat_pm12, sat_pm1230, sat_pm1, sat_pm130, sat_pm2, sat_pm230, sat_pm3, sat_pm330, sat_pm4, sat_pm430, sat_pm5, sat_pm530, sat_pm6, sat_pm630, sat_pm7, sat_pm730, sat_pm8, sat_pm830, sat_pm9, sat_pm930, sat_pm10, sat_pm1030, sat_pm11, sat_pm1130 } = req.body
        const updateDay = { sat_pm12, sat_pm1230, sat_pm1, sat_pm130, sat_pm2, sat_pm230, sat_pm3, sat_pm330, sat_pm4, sat_pm430, sat_pm5, sat_pm530, sat_pm6, sat_pm630, sat_pm7, sat_pm730, sat_pm8, sat_pm830, sat_pm9, sat_pm930, sat_pm10, sat_pm1030, sat_pm11, sat_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain sat_pm12, sat_pm1230, sat_pm1, sat_pm130, sat_pm2, sat_pm230, sat_pm3, sat_pm330, sat_pm4, sat_pm430, sat_pm5, sat_pm530, sat_pm6, sat_pm630, sat_pm7, sat_pm730, sat_pm8, sat_pm830, sat_pm9, sat_pm930, sat_pm10, sat_pm1030, sat_pm11, sat_pm1130`
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

        SatPMService.updateSatPM(
            req.app.get('db'),
            req.params.sat_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = SatPMRouter;