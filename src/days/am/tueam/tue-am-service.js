const TueAMService = {
    getAllTueAM(db) {
        return db.select('*').from('tue_am');
    },
    getTueAMById(db, tue_am_id) {
        return db.from('tue_am').select('*').where('tue_am_id', tue_am_id).first();
    },
    insertTueAM(db, newTueAM) {
        return db
            .insert(newTueAM)
            .into('tue_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTueAM(db, tue_am_id) {
        return db('tue_am')
            .where({ tue_am_id })
            .delete()
    },
    updateTueAM(db, tue_am_id, newTueAMFields) {
        return db('tue_am')
            .where({ tue_am_id })
            .update(newTueAMFields)
    }
}

module.exports = TueAMService;