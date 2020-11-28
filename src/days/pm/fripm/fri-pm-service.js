const FriPMService = {
    getAllFriPM(db) {
        return db.select('*').from('fri_pm');
    },
    getFriPMById(db, fri_pm_id) {
        return db.from('fri_pm').select('*').where('fri_pm_id', fri_pm_id).first();
    },
    insertFriPM(db, newFriPM) {
        return db
            .insert(newFriPM)
            .into('fri_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFriPM(db, fri_pm_id) {
        return db('fri_pm')
            .where({ fri_pm_id })
            .delete()
    },
    updateFriPM(db, fri_pm_id, newFriPMFields) {
        return db('fri_pm')
            .where({ fri_pm_id })
            .update(newFriPMFields)
    }
}

module.exports = FriPMService;