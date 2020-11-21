const TimezoneService = {
    getAllZones(knex) {
        return knex.select('*').from('timezone');
    },
    getTimezoneById(knex, timezoneId) {
        return knex.from('timezone').select('*').where('timezoneId', timezoneId).first();
    },
    insertTimezone(knex, newTimeZone) {
        return knex
            .insert(newTimeZone)
            .into('timezone')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTimezone(knex, timezoneId) {
        return knex('timezone')
            .where({ timezoneId })
            .delete()
    },
    updateTimezone(knex, timezoneId, newTimezoneFields) {
        return knex('timezone')
            .where({ timezoneId })
            .update(newTimezoneFields)
    }
}

module.exports = TimezoneService;