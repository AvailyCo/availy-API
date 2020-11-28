const SunPMService = {
    getAllSunPM(db) {
        return db.select('*').from('sun_pm');
    },
    getSunPMById(db, sun_pm_id) {
        return db.from('sun_pm').select('*').where('sun_pm_id', sun_pm_id).first();
    },
    insertSunPM(db, newSunPM) {
        return db
            .insert(newSunPM)
            .into('sun_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSunPM(db, sun_pm_id) {
        return db('sun_pm')
            .where({ sun_pm_id })
            .delete()
    },
    updateSunPM(db, sun_pm_id, newSunPMFields) {
        return db('sun_pm')
            .where({ sun_pm_id })
            .update(newSunPMFields)
    }
}

module.exports = SunPMService;