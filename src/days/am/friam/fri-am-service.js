const FriAMService = {
    getAllFriAM(db) {
        return db.select('*').from('fri_am');
    },
    getFriAMById(db, fri_am_id) {
        return db.from('fri_am').select('*').where('fri_am_id', fri_am_id).first();
    },
    insertFriAM(db, newFriAM) {
        return db
            .insert(newFriAM)
            .into('fri_am')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFriAM(db, fri_am_id) {
        return db('fri_am')
            .where({ fri_am_id })
            .delete()
    },
    updateFriAM(db, fri_am_id, newFriAMFields) {
        return db('fri_am')
            .where({ fri_am_id })
            .update(newFriAMFields)
    }
}

module.exports = FriAMService;