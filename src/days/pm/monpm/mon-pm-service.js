const MonPMService = {
    getAllMonPM(db) {
        return db.select('*').from('mon_pm');
    },
    getMonPMById(db, mon_pm_id) {
        return db.from('mon_pm').select('*').where('mon_pm_id', mon_pm_id).first();
    },
    insertMonPM(db, newMonPM) {
        return db
            .insert(newMonPM)
            .into('mon_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteMonPM(db, mon_pm_id) {
        return db('mon_pm')
            .where({ mon_pm_id })
            .delete()
    },
    updateMonPM(db, mon_pm_id, newMonPMFields) {
        return db('mon_pm')
            .where({ mon_pm_id })
            .update(newMonPMFields)
    }
}

module.exports = MonPMService;