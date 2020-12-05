const ThuAMService = {
    getAllThuAM(db) {
        return db.select('*').from('thu_am');
    },
    getThuAMById(db, thu_am_id) {
        return db.from('thu_am').select('*').where('thu_am_id', thu_am_id).first();
    },
    insertThuAM(db, newThuAM) {
        return db
            .insert(newThuAM)
            .into('thu_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteThuAM(db, thu_am_id) {
        return db('thu_am')
            .where({ thu_am_id })
            .delete()
    },
    updateThuAM(db, thu_am_id, newThuAMFields) {
        return db('thu_am')
            .where({ thu_am_id })
            .update(newThuAMFields)
    }
}

module.exports = ThuAMService;