const WeekService = {
    getAllWeeks(db) {
        return db.select('*').from('week');
    },
    getWeekById(db, weekid) {
        return db.from('week').select('*').where('weekid', weekid).first();
    },
    insertWeek(db, newWeek) {
        return db
            .insert(newWeek)
            .into('week')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteWeek(db, weekid) {
        return db('week')
            .where({ weekid })
            .delete()
    },
    updateWeek(db, weekid, newWeekFields) {
        return db('week')
            .where({ weekid })
            .update(newWeekFields)
    }
}

module.exports = WeekService;