const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger');
const WeeksService = require('./week-service')
const { getWeekValidationError } = require('./validate-week');

const WeeksRouter = express.Router()
const jsonParser = express.json()

const serializeWeek = week => ({
    weekid: week.weekid,
    sun_am_id: week.sun_am_id,
    sun_pm_id: week.sun_pm_id,
    mon_am_id: week.mon_am_id,
    mon_pm_id: week.mon_pm_id,
    tue_am_id: week.tue_am_id,
    tue_pm_id: week.tue_pm_id,
    wed_am_id: week.wed_am_id,
    wed_pm_id: week.wed_pm_id,
    thu_am_id: week.thu_am_id,
    thu_pm_id: week.thu_pm_id,
    fri_am_id: week.fri_am_id,
    fri_pm_id: week.fri_pm_id,
    sat_am_id: week.sat_am_id,
    sat_pm_id: week.sat_pm_id,
    week_type: xss(week.week_type)
});

WeeksRouter
    .route('/')
    .get((req, res, next) => {
        WeeksService.getAllWeeks(
            req.app.get('db')
        )
            .then(weeks => {
                res.json(weeks.map(serializeWeek))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { sun_am_id, sun_pm_id, mon_am_id, mon_pm_id, tue_am_id, tue_pm_id, wed_am_id,
            wed_pm_id, thu_am_id, thu_pm_id, fri_am_id, fri_pm_id, sat_am_id, sat_pm_id, week_type } = req.body
        const newWeek = {
            sun_am_id, sun_pm_id, mon_am_id, mon_pm_id, tue_am_id, tue_pm_id, wed_am_id,
            wed_pm_id, thu_am_id, thu_pm_id, fri_am_id, fri_pm_id, sat_am_id, sat_pm_id, week_type
        }

        for (const [key, value] of Object.entries(newWeek)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            }
        }

        const error = getWeekValidationError(newWeek);
        if (error) {
            logger.error({
                message: `POST Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        WeeksService.insertWeek(
            req.app.get('db'),
            newWeek
        )
            .then(week => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${week.weekid}`))
                    .json(serializeWeek(week))
            })
            .catch(next)
    })

WeeksRouter
    .route('/:weekid')
    .all((req, res, next) => {
        WeeksService.getWeekById(
            req.app.get('db'),
            req.params.weekid
        )
            .then(week => {
                if (!week) {
                    return res.status(404).json({
                        error: { message: `Week does not exist` }
                    })
                }
                res.week = week
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeWeek(res.week))
    })

    .delete((req, res, next) => {
        WeeksService.deleteWeek(
            req.app.get('db'),
            req.params.weekid
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { sun_am_id, sun_pm_id, mon_am_id, mon_pm_id, tue_am_id, tue_pm_id, wed_am_id,
            wed_pm_id, thu_am_id, thu_pm_id, fri_am_id, fri_pm_id, sat_am_id, sat_pm_id, week_type } = req.body
        const weekToUpdate = {
            sun_am_id, sun_pm_id, mon_am_id, mon_pm_id, tue_am_id, tue_pm_id, wed_am_id,
            wed_pm_id, thu_am_id, thu_pm_id, fri_am_id, fri_pm_id, sat_am_id, sat_pm_id, week_type
        }

        const numberOfValues = Object.values(weekToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain sun_am_id, sun_pm_id, mon_am_id, mon_pm_id, tue_am_id, tue_pm_id, wed_am_id, wed_pm_id, thu_am_id, thu_pm_id, fri_am_id, fri_pm_id, sat_am_id, sat_pm_id, or week_type`
                }
            });
        }

        const error = getWeekValidationError(weekToUpdate);
        if (error) {
            logger.error({
                message: `PATCH Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        WeeksService.updateWeek(
            req.app.get('db'),
            req.params.weekid,
            weekToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = WeeksRouter;
