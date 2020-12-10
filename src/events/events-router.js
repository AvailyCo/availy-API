const path = require('path');
const express = require('express');

const EventsService = require('./events-service');

const eventsRouter = express.Router();
const jsonParser = express.json();

eventsRouter
  .route('/')
  .get((req, res, next) => {
    EventsService.getAllEvents(
      req.app.get('db')
    )
      .then(event => {
        res.json(event.map(EventsService.serializeEvent));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      event_name,
      about_event,
      event_link,
      event_location_name,
      event_street,
      event_city,
      event_state,
      event_zip,
      event_start_time,
      event_end_time,
      event_start_date,
      event_end_date,
      event_timezone,
      week_id
    } = req.body;

    const newEvent = {
      event_name,
      about_event,
      event_link,
      event_location_name,
      event_street,
      event_city,
      event_state,
      event_zip,
      event_start_time,
      event_end_time,
      event_start_date,
      event_end_date,
      event_timezone,
      week_id
    };

    for (const [key, value] of Object.entries(newEvent)) {
      if (value == null) {
        return res
          .status(400)
          .json({
            error: `Missing '${key}' in request body`
          })
      }
    }

    EventsService.postEvent(
      req.app.get('db'),
      newEvent
    )
      .then(event => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${event.event_id}`))
          .json(EventsService.serializeEvent(event));
      })
      .catch(next);
  })

eventsRouter
  .route('/:eventId')
  .all(checkEventExists)
  .get((req, res) => {
    res.json(EventsService.serializeEvent(res.event));
  })
  .patch(jsonParser, (req, res, next) => {
    const {
      event_name,
      about_event, 
      event_link,
      event_location_name,
      event_street,
      event_city,
      event_state,
      event_zip,
      event_start_time,
      event_end_time,
      event_start_date,
      event_end_date,
      event_timezone,
      week_id
    } = req.body;

    const eventPatch = {
      event_name,
      about_event, 
      event_link,
      event_location_name,
      event_street,
      event_city,
      event_state,
      event_zip,
      event_start_time,
      event_end_time,
      event_start_date,
      event_end_date,
      event_timezone,
      week_id
    };

    const numOfValues = Object.values(eventPatch);
    if (numOfValues === 0) {
      return res
        .status(400)
        .json({
          error: `Request body must contain either 'host_id', 'event_name', 'about_event', 'event_location', 'event_city', 'event_state', 'event_zip', 'event_time', 'event_date', 'event_timezone', 'week_id'`
        });
    }

    EventsService.patchEvent(
      req.app.get('db'),
      req.params.eventId,
      eventPatch
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    EventsService.deleteEvent(
      req.app.get('db'),
      req.params.eventId
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })


async function checkEventExists(req, res, next) {
  try {
    const event = await EventsService.getEventById(
      req.app.get('db'),
      req.params.eventId
    );

    if (!event) {
      return res.status(404).json({
        error: `Event does not exist`
      });
    }

    res.event = event;
    next();
  } catch (error) {
    next(error);
  }
}


module.exports = eventsRouter;