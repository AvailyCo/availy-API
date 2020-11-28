const ThuPMService = {
    getAllThuPM(db) {
        return db.select('*').from('thu_pm');
    },
    getThuPMById(db, thu_pm_id) {
        return db.from('thu_pm').select('*').where('thu_pm_id', thu_pm_id).first();
    },
    insertThuPM(db, newThuPM) {
        return db
            .insert(newThuPM)
            .into('thu_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteThuPM(db, thu_pm_id) {
        return db('thu_pm')
            .where({ thu_pm_id })
            .delete()
    },
    updateThuPM(db, thu_pm_id, newThuPMFields) {
        return db('thu_pm')
            .where({ thu_pm_id })
            .update(newThuPMFields)
    }
}

module.exports = ThuPMService;