const SatAMService = {
    getAllSatAM(db) {
        return db.select('*').from('sat_am');
    },
    getSatAMById(db, sat_am_id) {
        return db.from('sat_am').select('*').where('sat_am_id', sat_am_id).first();
    },
    insertSatAM(db, newSatAM) {
        return db
            .insert(newSatAM)
            .into('sat_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSatAM(db, sat_am_id) {
        return db('sat_am')
            .where({ sat_am_id })
            .delete()
    },
    updateSatAM(db, sat_am_id, newSatAMFields) {
        return db('sat_am')
            .where({ sat_am_id })
            .update(newSatAMFields)
    }
}

module.exports = SatAMService;