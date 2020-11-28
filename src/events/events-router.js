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
      // host_id, << should effectively remove need for 'hosts' table
      event_name,
      about_event,
      event_location, // rename to 'venue_name' for building identities
      // event_link, << for online only events
      // event_street, << clearer labeling for physical addresses
      event_city,
      event_state,
      event_zip,
      event_time,
      // event_start_time,
      // event_end_time
      event_date,
      // event_start_date
      // event end_date
      event_timezone,
      week_id
    } = req.body;

    const newEvent = {
      event_name,
      about_event,
      event_location,
      event_city,
      event_state,
      event_zip,
      event_time,
      event_date,
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
      // host_id,
      event_name,
      about_event,
      event_location,
      event_city,
      event_state,
      event_zip,
      event_time,
      event_date,
      event_timezone,
      week_id
    } = req.body;

    const eventPatch = {
      // host_id,
      event_name,
      about_event,
      event_location,
      event_city,
      event_state,
      event_zip,
      event_time,
      event_date,
      event_timezone,
      week_id
    };

    const numOfValues = Object.values(eventPatch);
    if (numOfValues == 0) {
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

eventsRouter
  .route('/:eventId/guests')
  .all(checkEventExists)
  .get((req, res, next) => {
    EventsService.getEventGuests(
      req.app.get('db'),
      req.params.eventId
    )
      .then(guests => {
        res.json(guests.map(EventsService.serializeGuest));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { event_id, user_id, attending } = req.body;
    const newGuest = { event_id, user_id, attending };

    for (const [key, value] of Object.entries(newGuest)) {
      if (value == null) {
        return res
          .status(400)
          .json({
            error: `Missing '${key}' in request body`
          });
      }
    }

    EventsService.postEventGuest(
      req.app.get('db'),
      newGuest
    )
      .then(guest => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${newGuest.user_id}`))
          .json(EventsService.serializeGuest(newGuest));
      })
      .catch(next);
  })


eventsRouter
  .route('/:eventId/guests/:guestId')
  .all(checkGuestExists)
  .get((req, res) => {
    res.json(EventsService.serializeGuest(res.guest));
  })
  .patch(jsonParser, (req, res, next) => {
    const { attending } = req.body;
    const guestPatch = { attending };

    const numOfValues = Object.values(guestPatch);
    if (numOfValues == 0) {
      return res
        .status(400)
        .json({
          error: `Request body must contain 'attending'`
        });
    }

    EventsService.patchGuest(
      req.app.get('db'),
      req.params.guestId,
      guestPatch
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const { user_id } = req.body;
    const removeGuestID = { user_id };

    EventsService.deleteGuest(
      req.app.get('db'),
      removeGuestID
    )
      .then(numRowsAffected => {
        res
          .status(204)
          .end();
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

async function checkGuestExists(req, res, next) {
  try {
    const guest = await EventsService.getEventGuestByID(
      req.app.get('db'),
      req.params.eventId,
      req.params.guestId
    );

    if (!guest) {
      return res.status(404).json({
        error: `Guest does not exist`
      });
    }

    res.guest = guest;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = eventsRouter;