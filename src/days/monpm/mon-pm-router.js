const path = require('path')
const express = require('express')
const logger = require('../logger');
const MonPMService = require('./mon-pm-service')
const { getDayValidationError } = require('./validate-day');

const MonPMRouter = express.Router()
const jsonParser = express.json()

const getDay = day => ({
    mon_pm_id: day.mon_PM_Id,
    mon_pm12: day.mon_pm12,
    mon_pm1230: day.mon_pm1230,
    mon_pm1: day.mon_pm1,
    mon_pm130: day.mon_pm130,
    mon_pm2: day.mon_pm2,
    mon_pm230: day.mon_pm230,
    mon_pm3: day.mon_pm3,
    mon_pm330: day.mon_pm330,
    mon_pm4: day.mon_pm4,
    mon_pm430: day.mon_pm430,
    mon_pm5: day.mon_pm5,
    mon_pm530: day.mon_pm530,
    mon_pm6: day.mon_pm6,
    mon_pm630: day.mon_pm630,
    mon_pm7: day.mon_pm7,
    mon_pm730: day.mon_pm730,
    mon_pm8: day.mon_pm8,
    mon_pm830: day.mon_pm830,
    mon_pm9: day.mon_pm9,
    mon_pm930: day.mon_pm930,
    mon_pm10: day.mon_pm10,
    mon_pm1030: day.mon_pm1030,
    mon_pm11: day.mon_pm11,
    mon_pm1130: day.mon_pm1130
});

MonPMRouter
    .route('/')
    .get((req, res, next) => {
        MonPMService.getAllMonPM(
            req.app.get('db')
        )
            .then(days => {
                res.json(days.map(getDay))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { mon_pm12, mon_pm1230, mon_pm1, mon_pm130, mon_pm2, mon_pm230, mon_pm3, mon_pm330, mon_pm4, mon_pm430, mon_pm5, mon_pm530, mon_pm6, mon_pm630, mon_pm7, mon_pm730, mon_pm8, mon_pm830, mon_pm9, mon_pm930, mon_pm10, mon_pm1030, mon_pm11, mon_pm1130 } = req.body
        const newDay = { mon_pm12, mon_pm1230, mon_pm1, mon_pm130, mon_pm2, mon_pm230, mon_pm3, mon_pm330, mon_pm4, mon_pm430, mon_pm5, mon_pm530, mon_pm6, mon_pm630, mon_pm7, mon_pm730, mon_pm8, mon_pm830, mon_pm9, mon_pm930, mon_pm10, mon_pm1030, mon_pm11, mon_pm1130 }

        for (const [key, value] of Object.entries(newDay)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            }
        }

        /*  const error = getDayValidationError(newDay);
         if (error) {
             logger.error({
                 message: `POST Validation Error`,
                 request: `${req.originalUrl}`,
                 method: `${req.method}`,
                 ip: `${req.ip}`
             });
             return res.status(400).send(error);
         } */

        MonPMService.insertMonPM(
            req.app.get('db'),
            newDay
        )
            .then(oneDay => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${oneDay.mon_pm_id}`))
                    .json(getDay(oneDay))
            })
            .catch(next)
    })

MonPMRouter
    .route('/:mon_pm_id')
    .all((req, res, next) => {
        MonPMService.getMonPMById(
            req.app.get('db'),
            req.params.mon_pm_id
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
        MonPMService.deleteMonPM(
            req.app.get('db'),
            req.params.mon_pm_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { mon_pm12, mon_pm1230, mon_pm1, mon_pm130, mon_pm2, mon_pm230, mon_pm3, mon_pm330, mon_pm4, mon_pm430, mon_pm5, mon_pm530, mon_pm6, mon_pm630, mon_pm7, mon_pm730, mon_pm8, mon_pm830, mon_pm9, mon_pm930, mon_pm10, mon_pm1030, mon_pm11, mon_pm1130 } = req.body
        const updateDay = { mon_pm12, mon_pm1230, mon_pm1, mon_pm130, mon_pm2, mon_pm230, mon_pm3, mon_pm330, mon_pm4, mon_pm430, mon_pm5, mon_pm530, mon_pm6, mon_pm630, mon_pm7, mon_pm730, mon_pm8, mon_pm830, mon_pm9, mon_pm930, mon_pm10, mon_pm1030, mon_pm11, mon_pm1130 }

        const numberOfValues = Object.values(updateDay).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain mon_pm12, mon_pm1230, mon_pm1, mon_pm130, mon_pm2, mon_pm230, mon_pm3, mon_pm330, mon_pm4, mon_pm430, mon_pm5, mon_pm530, mon_pm6, mon_pm630, mon_pm7, mon_pm730, mon_pm8, mon_pm830, mon_pm9, mon_pm930, mon_pm10, mon_pm1030, mon_pm11, mon_pm1130`
                }
            });
        }

        /*  const error = getDayValidationError(updateDay);
         if (error) {
             logger.error({
                 message: `POST Validation Error`,
                 request: `${req.originalUrl}`,
                 method: `${req.method}`,
                 ip: `${req.ip}`
             });
             return res.status(400).send(error);
         } */

        MonPMService.updateMonPM(
            req.app.get('db'),
            req.params.mon_pm_id,
            updateDay
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = MonPMRouter;
