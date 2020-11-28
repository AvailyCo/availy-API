const EventsService = {
    getAllEvents(db) {
        return db.select('*').from('events');
    },
    getEventById(db, event_id) {
        return db.from('events').select('*').where('event_id', event_id).first();
    },
    insertEvent(db, newEvent) {
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
    updateEvent(db, event_id, newEventFields) {
        return db('events')
            .where({ event_id })
            .update(newEventFields)
    }
}

module.exports = EventsService;