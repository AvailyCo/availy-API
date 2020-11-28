const SatPMService = {
    getAllSatPM(db) {
        return db.select('*').from('sat_pm');
    },
    getSatPMById(db, sat_pm_id) {
        return db.from('sat_pm').select('*').where('sat_pm_id', sat_pm_id).first();
    },
    insertSatPM(db, newSatPM) {
        return db
            .insert(newSatPM)
            .into('sat_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSatPM(db, sat_pm_id) {
        return db('sat_pm')
            .where({ sat_pm_id })
            .delete()
    },
    updateSatPM(db, sat_pm_id, newSatPMFields) {
        return db('sat_pm')
            .where({ sat_pm_id })
            .update(newSatPMFields)
    }
}

module.exports = SatPMService;