const WeekService = {
    getAllWeeks(knex) {
        return knex.select('*').from('week');
    },
    getWeekById(knex, weekId) {
        return knex.from('week').select('*').where('weekId', weekId).first();
    },
    insertWeek(knex, newWeek) {
        return knex
            .insert(newWeek)
            .into('week')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteWeek(knex, weekId) {
        return knex('week')
            .where({ weekId })
            .delete()
    },
    updateWeek(knex, weekId, newWeekFields) {
        return knex('week')
            .where({ weekId })
            .update(newWeekFields)
    }
}

module.exports = WeekService;