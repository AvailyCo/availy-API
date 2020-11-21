const WeekService = {
    getAllWeeks(knex) {
        return knex.select('*').from('week');
    },
    getWeekById(knex, weekid) {
        return knex.from('week').select('*').where('weekid', weekid).first();
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
    deleteWeek(knex, weekid) {
        return knex('week')
            .where({ weekid })
            .delete()
    },
    updateWeek(knex, weekid, newWeekFields) {
        return knex('week')
            .where({ weekid })
            .update(newWeekFields)
    }
}

module.exports = WeekService;