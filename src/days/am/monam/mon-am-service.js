const MonAMService = {
    getAllMonAM(db) {
        return db.select('*').from('mon_am');
    },
    getMonAMById(db, mon_am_id) {
        return db.from('mon_am').select('*').where('mon_am_id', mon_am_id).first();
    },
    insertMonAM(db, newMonAM) {
        return db
            .insert(newMonAM)
            .into('mon_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteMonAM(db, mon_am_id) {
        return db('mon_am')
            .where({ mon_am_id })
            .delete()
    },
    updateMonAM(db, mon_am_id, newMonAMFields) {
        return db('mon_am')
            .where({ mon_am_id })
            .update(newMonAMFields)
    }
}

module.exports = MonAMService;