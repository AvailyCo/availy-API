const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger');
const TimezoneService = require('./timezone-service')
const { getTimezoneValidationError } = require('./validate-timezone');

const timezoneRouter = express.Router()
const jsonParser = express.json()

//timezoneid INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
const serializeTimezone = zone => ({
    timezoneid: zone.timezoneid,
    zonename: zone.zonename,
    zoneoffset: xss(zone.zoneoffset),
    zonedesc: xss(zone.zonedesc)
});


timezoneRouter
    .route('/')
    .get((req, res, next) => {
        TimezoneService.getAllZones(
            req.app.get('db')
        )
            .then(zones => {
                res.json(zones.map(serializeTimezone))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { zonename, zoneoffset, zonedesc } = req.body
        const newTimezone = { zonename, zoneoffset, zonedesc }

        for (const [key, value] of Object.entries(newTimezone)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            }
        }

        const error = getTimezoneValidationError(newTimezone);

        if (error) {
            logger.error({
                message: `POST Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        TimezoneService.insertTimezone(
            req.app.get('db'),
            newTimezone
        )
            .then(zone => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${zone.timezoneid}`))
                    .json(serializeTimezone(zone))
            })
            .catch(next)
    })

timezoneRouter
    .route('/:timezoneid')
    .all((req, res, next) => {
        TimezoneService.getTimezoneById(
            req.app.get('db'),
            req.params.timezoneid
        )
            .then(zone => {
                if (!zone) {
                    return res.status(404).json({
                        error: { message: `Timezone does not exist` }
                    })
                }
                res.zone = zone
                next()
            })
            .catch(next)
    })

    .get((req, res, next) => {
        res.json(serializeTimezone(res.zone))
    })

    .delete((req, res, next) => {
        TimezoneService.deleteTimezone(
            req.app.get('db'),
            req.params.timezoneid
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { zonename, zoneoffset, zonedesc } = req.body
        const zoneToUpdate = { zonename, zoneoffset, zonedesc }

        const numberOfValues = Object.values(zoneToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain zonename, zoneoffset, zonedesc`
                }
            });
        }

        const error = getTimezoneValidationError(zoneToUpdate);
        if (error) {
            logger.error({
                message: `PATCH Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        TimezoneService.updateTimezone(
            req.app.get('db'),
            req.params.timezoneid,
            zoneToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = timezoneRouter;
