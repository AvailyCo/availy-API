const WedPMService = {
    getAllWedPM(db) {
        return db.select('*').from('wed_pm');
    },
    getWedPMById(db, wed_pm_id) {
        return db.from('wed_pm').select('*').where('wed_pm_id', wed_pm_id).first();
    },
    insertWedPM(db, newWedPM) {
        return db
            .insert(newWedPM)
            .into('wed_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteWedPM(db, wed_pm_id) {
        return db('wed_pm')
            .where({ wed_pm_id })
            .delete()
    },
    updateWedPM(db, wed_pm_id, newWedPMFields) {
        return db('wed_pm')
            .where({ wed_pm_id })
            .update(newWedPMFields)
    }
}

module.exports = WedPMService;