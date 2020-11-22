const path = require('path')
const express = require('express')
const FriPMService = require('./fri-pm-service');
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');

const FriPMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    fri_pm_id: day.fri_pm_id,
    fri_pm12: day.fri_pm12,
    fri_pm1230: day.fri_pm1230,
    fri_pm1: day.fri_pm1,
    fri_pm130: day.fri_pm130,
    fri_pm2: day.fri_pm2,
    fri_pm230: day.fri_pm230,
    fri_pm3: day.fri_pm3,
    fri_pm330: day.fri_pm330,
    fri_pm4: day.fri_pm4,
    fri_pm430: day.fri_pm430,
    fri_pm5: day.fri_pm5,
    fri_pm530: day.fri_pm530,
    fri_pm6: day.fri_pm6,
    fri_pm630: day.fri_pm630,
    fri_pm7: day.fri_pm7,
    fri_pm730: day.fri_pm730,
    fri_pm8: day.fri_pm8,
    fri_pm830: day.fri_pm830,
    fri_pm9: day.fri_pm9,
    fri_pm930: day.fri_pm930,
    fri_pm10: day.fri_pm10,
    fri_pm1030: day.fri_pm1030,
    fri_pm11: day.fri_pm11,
    fri_pm1130: day.fri_pm1130
});

FriPMRouter
    .route('/')
    .get((req, res, next) => {
        FriPMService.getAllFriPM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { fri_pm12, fri_pm1230, fri_pm1, fri_pm130, fri_pm2, fri_pm230, fri_pm3, fri_pm330, fri_pm4, fri_pm430, fri_pm5, fri_pm530, fri_pm6, fri_pm630, fri_pm7, fri_pm730, fri_pm8, fri_pm830, fri_pm9, fri_pm930, fri_pm10, fri_pm1030, fri_pm11, fri_pm1130 } = req.body
        const newDay = { fri_pm12, fri_pm1230, fri_pm1, fri_pm130, fri_pm2, fri_pm230, fri_pm3, fri_pm330, fri_pm4, fri_pm430, fri_pm5, fri_pm530, fri_pm6, fri_pm630, fri_pm7, fri_pm730, fri_pm8, fri_pm830, fri_pm9, fri_pm930, fri_pm10, fri_pm1030, fri_pm11, fri_pm1130 }

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

        FriPMService.insertFriPM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.fri_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

FriPMRouter
    .route('/:fri_pm_id')
    .all((req, res, next) => {
        FriPMService.getFriPMById(
            req.app.get('db'),
            req.params.fri_pm_id
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
        FriPMService.deleteFriPM(
            req.app.get('db'),
            req.params.fri_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { fri_pm12, fri_pm1230, fri_pm1, fri_pm130, fri_pm2, fri_pm230, fri_pm3, fri_pm330, fri_pm4, fri_pm430, fri_pm5, fri_pm530, fri_pm6, fri_pm630, fri_pm7, fri_pm730, fri_pm8, fri_pm830, fri_pm9, fri_pm930, fri_pm10, fri_pm1030, fri_pm11, fri_pm1130 } = req.body
        const updateDay = { fri_pm12, fri_pm1230, fri_pm1, fri_pm130, fri_pm2, fri_pm230, fri_pm3, fri_pm330, fri_pm4, fri_pm430, fri_pm5, fri_pm530, fri_pm6, fri_pm630, fri_pm7, fri_pm730, fri_pm8, fri_pm830, fri_pm9, fri_pm930, fri_pm10, fri_pm1030, fri_pm11, fri_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain fri_pm12, fri_pm1230, fri_pm1, fri_pm130, fri_pm2, fri_pm230, fri_pm3, fri_pm330, fri_pm4, fri_pm430, fri_pm5, fri_pm530, fri_pm6, fri_pm630, fri_pm7, fri_pm730, fri_pm8, fri_pm830, fri_pm9, fri_pm930, fri_pm10, fri_pm1030, fri_pm11, fri_pm1130`
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

        FriPMService.updateFriPM(
            req.app.get('db'),
            req.params.fri_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = FriPMRouter;