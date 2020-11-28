const TuePMService = {
    getAllTuePM(db) {
        return db.select('*').from('tue_pm');
    },
    getTuePMById(db, tue_pm_id) {
        return db.from('tue_pm').select('*').where('tue_pm_id', tue_pm_id).first();
    },
    insertTuePM(db, newTuePM) {
        return db
            .insert(newTuePM)
            .into('tue_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTuePM(db, tue_pm_id) {
        return db('tue_pm')
            .where({ tue_pm_id })
            .delete()
    },
    updateTuePM(db, tue_pm_id, newTuePMFields) {
        return db('tue_pm')
            .where({ tue_pm_id })
            .update(newTuePMFields)
    }
}

module.exports = TuePMService;