const SunAMService = {
    getAllSunAM(db) {
        return db.select('*').from('sun_am');
    },
    getSunAMById(db, sun_am_id) {
        return db.from('sun_am').select('*').where('sun_am_id', sun_am_id).first();
    },
    insertSunAM(db, newSunAM) {
        return db
            .insert(newSunAM)
            .into('sun_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSunAM(db, sun_am_id) {
        return db('sun_am')
            .where({ sun_am_id })
            .delete()
    },
    updateSunAM(db, sun_am_id, newSunAMFields) {
        return db('sun_am')
            .where({ sun_am_id })
            .update(newSunAMFields)
    }
}

module.exports = SunAMService;