const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger');
const GuestsService = require('./guests-service')
const { getGuestValidationError } = require('./validate-guests');

const GuestsRouter = express.Router()
const jsonParser = express.json()

const serializeGuest = guest => ({
    attending_id: guest.attending_id,
    event_id: guest.event_id,
    user_id: xss(guest.user_id),
    attending: xss(guest.attending)
});

GuestsRouter
    .route('/')
    .get((req, res, next) => {
        GuestsService.getAllGuests(
            req.app.get('db')
        )
            .then(guests => {
                res.json(guests.map(serializeGuest))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { event_id, user_id, attending } = req.body
        const newGuest = { event_id, user_id, attending }

        for (const [key, value] of Object.entries(newGuest)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            }
        }

        const error = getGuestValidationError(newGuest);
        if (error) {
            logger.error({
                message: `POST Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        GuestsService.insertGuest(
            req.app.get('db'),
            newGuest
        )
            .then(guest => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${guest.attending_id}`))
                    .json(serializeGuest(guest))
            })
            .catch(next)
    })

GuestsRouter
    .route('/:attending_id')
    .all((req, res, next) => {
        GuestsService.getGuestById(
            req.app.get('db'),
            req.params.attending_id
        )
            .then(guest => {
                if (!guest) {
                    return res.status(404).json({
                        error: { message: `Guest does not exist` }
                    })
                }
                res.guest = guest
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeGuest(res.guest))
    })

    .delete((req, res, next) => {
        GuestsService.deleteGuest(
            req.app.get('db'),
            req.params.attending_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { event_id, user_id, attending } = req.body
        const guestToUpdate = { event_id, user_id, attending }

        const numberOfValues = Object.values(guestToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain cevent_id, user_id, or attending`
                }
            });
        }

        const error = getGuestValidationError(guestToUpdate);
        if (error) {
            logger.error({
                message: `PATCH Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        }

        GuestsService.updateGuest(
            req.app.get('db'),
            req.params.attending_id,
            guestToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = GuestsRouter;