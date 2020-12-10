const TimezoneService = {
    getAllZones(db) {
        return db.select('*').from('timezone');
    },
    getTimezoneById(db, timezoneid) {
        return db.from('timezone').select('*').where('timezoneid', timezoneid).first();
    },
    insertTimezone(db, newTimeZone) {
        return db
            .insert(newTimeZone)
            .into('timezone')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTimezone(db, timezoneid) {
        return db('timezone')
            .where({ timezoneid })
            .delete()
    },
    updateTimezone(db, timezoneid, newTimezoneFields) {
        return db('timezone')
            .where({ timezoneid })
            .update(newTimezoneFields)
    }
}

module.exports = TimezoneService;