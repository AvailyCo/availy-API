const TimezoneService = {
    getAllTimezones(knex) {
        return knex.select('*').from('timezone');
    },
    getTimezoneById(knex, timezoneid) {
        return knex.from('timezone').select('*').where('timezoneid', timezoneid).first();
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
    deleteTimezone(knex, timezoneid) {
        return knex('timezone')
            .where({ timezoneid })
            .delete()
    },
    updateTimezone(knex, timezoneid, newTimezoneFields) {
        return knex('timezone')
            .where({ timezoneid })
            .update(newTimezoneFields)
    }
}

//module.exports = FoldersService;