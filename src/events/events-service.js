const EventsService = {
    getAllEvents(knex) {
        return knex.select('*').from('events');
    },
    getEventById(knex, event_id) {
        return knex.from('events').select('*').where('event_id', event_id).first();
    },
    insertEvent(knex, newEvent) {
        return knex
            .insert(newEvent)
            .into('events')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteEvent(knex, event_id) {
        return knex('events')
            .where({ event_id })
            .delete()
    },
    updateEvent(knex, event_id, newEventFields) {
        return knex('events')
            .where({ event_id })
            .update(newEventFields)
    }
}

module.exports = EventsService;