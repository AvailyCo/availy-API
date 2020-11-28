const path = require('path')
const express = require('express')
const logger = require('../../../logger');
const { getDayValidationError } = require('../../validate-day');
const WedPMService = require('./wed-pm-service');

const WedPMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    wed_pm_id: day.wed_pm_id,
    wed_pm12: day.wed_pm12,
    wed_pm1230: day.wed_pm1230,
    wed_pm1: day.wed_pm1,
    wed_pm130: day.wed_pm130,
    wed_pm2: day.wed_pm2,
    wed_pm230: day.wed_pm230,
    wed_pm3: day.wed_pm3,
    wed_pm330: day.wed_pm330,
    wed_pm4: day.wed_pm4,
    wed_pm430: day.wed_pm430,
    wed_pm5: day.wed_pm5,
    wed_pm530: day.wed_pm530,
    wed_pm6: day.wed_pm6,
    wed_pm630: day.wed_pm630,
    wed_pm7: day.wed_pm7,
    wed_pm730: day.wed_pm730,
    wed_pm8: day.wed_pm8,
    wed_pm830: day.wed_pm830,
    wed_pm9: day.wed_pm9,
    wed_pm930: day.wed_pm930,
    wed_pm10: day.wed_pm10,
    wed_pm1030: day.wed_pm1030,
    wed_pm11: day.wed_pm11,
    wed_pm1130: day.wed_pm1130
});

WedPMRouter
    .route('/')
    .get((req, res, next) => {
        WedPMService.getAllWedPM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { wed_pm12, wed_pm1230, wed_pm1, wed_pm130, wed_pm2, wed_pm230, wed_pm3, wed_pm330, wed_pm4, wed_pm430, wed_pm5, wed_pm530, wed_pm6, wed_pm630, wed_pm7, wed_pm730, wed_pm8, wed_pm830, wed_pm9, wed_pm930, wed_pm10, wed_pm1030, wed_pm11, wed_pm1130 } = req.body
        const newDay = { wed_pm12, wed_pm1230, wed_pm1, wed_pm130, wed_pm2, wed_pm230, wed_pm3, wed_pm330, wed_pm4, wed_pm430, wed_pm5, wed_pm530, wed_pm6, wed_pm630, wed_pm7, wed_pm730, wed_pm8, wed_pm830, wed_pm9, wed_pm930, wed_pm10, wed_pm1030, wed_pm11, wed_pm1130 }

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

        WedPMService.insertWedPM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.wed_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

WedPMRouter
    .route('/:wed_pm_id')
    .all((req, res, next) => {
        WedPMService.getWedPMById(
            req.app.get('db'),
            req.params.wed_pm_id
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
        WedPMService.deleteWedPM(
            req.app.get('db'),
            req.params.wed_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { wed_pm12, wed_pm1230, wed_pm1, wed_pm130, wed_pm2, wed_pm230, wed_pm3, wed_pm330, wed_pm4, wed_pm430, wed_pm5, wed_pm530, wed_pm6, wed_pm630, wed_pm7, wed_pm730, wed_pm8, wed_pm830, wed_pm9, wed_pm930, wed_pm10, wed_pm1030, wed_pm11, wed_pm1130 } = req.body
        const updateDay = { wed_pm12, wed_pm1230, wed_pm1, wed_pm130, wed_pm2, wed_pm230, wed_pm3, wed_pm330, wed_pm4, wed_pm430, wed_pm5, wed_pm530, wed_pm6, wed_pm630, wed_pm7, wed_pm730, wed_pm8, wed_pm830, wed_pm9, wed_pm930, wed_pm10, wed_pm1030, wed_pm11, wed_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain wed_pm12, wed_pm1230, wed_pm1, wed_pm130, wed_pm2, wed_pm230, wed_pm3, wed_pm330, wed_pm4, wed_pm430, wed_pm5, wed_pm530, wed_pm6, wed_pm630, wed_pm7, wed_pm730, wed_pm8, wed_pm830, wed_pm9, wed_pm930, wed_pm10, wed_pm1030, wed_pm11, wed_pm1130`
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

        WedPMService.updateWedPM(
            req.app.get('db'),
            req.params.wed_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = WedPMRouter;
