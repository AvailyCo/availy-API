const path = require('path')
const express = require('express')
const xss = require('xss')
const logger = require('../logger');
const HostsService = require('./hosts-service')
/* const { getHostValidationError } = require('./validate-host'); */

const HostsRouter = express.Router()
const jsonParser = express.json()

const serializeHost = host => ({
    host_id: host.host_id,
    user_id: host.user_id,
    event_id: xss(host.event_id)
});

HostsRouter
    .route('/')
    .get((req, res, next) => {
        HostsService.getAllHosts(
            req.app.get('db')
        )
            .then(hosts => {
                res.json(hosts.map(serializeHost))
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { user_id, event_id } = req.body
        const newHost = { user_id, event_id }

        for (const [key, value] of Object.entries(newHost)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                });
            }
        }

        /* const error = getHostValidationError(newHost);
        if (error) {
            logger.error({
                message: `POST Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        } */

        HostsService.insertHost(
            req.app.get('db'),
            newHost
        )
            .then(host => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${host.host_id}`))
                    .json(serializeHost(host))
            })
            .catch(next)
    })

HostsRouter
    .route('/:host_id')
    .all((req, res, next) => {
        HostsService.getHostById(
            req.app.get('db'),
            req.params.host_id
        )
            .then(host => {
                if (!host) {
                    return res.status(404).json({
                        error: { message: `Host does not exist` }
                    })
                }
                res.host = host
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeHost(res.host))
    })

    .delete((req, res, next) => {
        HostsService.deleteHost(
            req.app.get('db'),
            req.params.host_id
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    .patch(jsonParser, (req, res, next) => {
        const { user_id, event_id } = req.body
        const hostToUpdate = { user_id, event_id }

        const numberOfValues = Object.values(hostToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain user_id or event_id`
                }
            });
        }

        /* const error = getHostValidationError(hostToUpdate);
        if (error) {
            logger.error({
                message: `PATCH Validation Error`,
                request: `${req.originalUrl}`,
                method: `${req.method}`,
                ip: `${req.ip}`
            });
            return res.status(400).send(error);
        } */

        HostsService.updateHost(
            req.app.get('db'),
            req.params.host_id,
            hostToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = HostsRouter;