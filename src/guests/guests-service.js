const GuestService = {
    getAllGuests(db) {
        return db.select('*').from('guests');
    },
    getGuestById(db, attending_id) {
        return db.from('guests').select('*').where('attending_id', attending_id).first();
    },
    insertGuest(db, newGuest) {
        return db
            .insert(newGuest)
            .into('guests')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteGuest(db, attending_id) {
        return db('guests')
            .where({ attending_id })
            .delete()
    },
    updateGuest(db, attending_id, newGuestFields) {
        return db('guests')
            .where({ attending_id })
            .update(newGuestFields)
    }
}

module.exports = GuestService;