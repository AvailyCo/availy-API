const xss = require('xss');

const EventsService = {
    getAllEvents(db) {
        return db
            .select('*')
            .from('events');
    },
    getEventById(db, event_id) {
        return db
            .from('events')
            .select('*')
            .where('event_id', event_id)
            .first();
    },
    postEvent(db, newEvent) {
        return db
            .insert(newEvent)
            .into('events')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteEvent(db, event_id) {
        return db('events')
            .where({ event_id })
            .delete()
    },
    patchEvent(db, event_id, newEventFields) {
        return db('events')
            .where({ event_id })
            .update(newEventFields)
    },
  
    //temporarily save
    /*getEventGuests(knex, event_id) {
        return knex
            .from('guests')
            .select('*')
            .where({ event_id })
    },
    getEventGuestByID(knex, event_id, user_id) {
        return EventsService.getEventGuests(knex, event_id)
            .where({ user_id })
            .first();
    },
    postEventGuest(knex, guest) {
        return knex
            .insert(guest)
            .into('guests')
            .returning('*')
            .then(([guests]) => guests)
            .then(guest =>
                EventsService.getEventGuestByID(knex, guest.user_id)    
            )
    },
    patchGuest(knex, user_id, newGuestData) {
        return knex('guests')
            .where({ user_id })
            .update(newGuestData);
    },
    deleteGuest(knex, user_id) {
        return knex('guests')
            .where({ user_id })
            .delete();
    },
    */
    serializeEvent(event) {
        return {
            event_id: event.event_id,
            event_name: xss(event.event_name),
            host_id: event.host_id,
            about_event: xss(event.about_event),
            event_location: xss(event.event_location),
            event_city: xss(event.event_city),
            event_state: event.event_state,
            event_zip: event.event_zip,
            event_time: event.event_time,
            event_date: event.event_date,
            event_timezone: event.event_timezone,
            week_id: event.week_id
        }
    },
    
  /*serializeGuest(guest) {
        return {
            attending_id: guest.attending_id,
            event_id: guest.event_id,
            user_id: guest.user_id,
            attending: guest.attending
        }
    }*/
}

module.exports = EventsService;