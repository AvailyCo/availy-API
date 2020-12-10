const WedAMService = {
    getAllWedAM(db) {
        return db.select('*').from('wed_am');
    },
    getWedAMById(db, wed_am_id) {
        return db.from('wed_am').select('*').where('wed_am_id', wed_am_id).first();
    },
    insertWedAM(db, newWedAM) {
        return db
            .insert(newWedAM)
            .into('wed_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteWedAM(db, wed_am_id) {
        return db('wed_am')
            .where({ wed_am_id })
            .delete()
    },
    updateWedAM(db, wed_am_id, newWedAMFields) {
        return db('wed_am')
            .where({ wed_am_id })
            .update(newWedAMFields)
    }
}

module.exports = WedAMService;