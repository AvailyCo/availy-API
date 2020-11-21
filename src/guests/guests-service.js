const GuestService = {
    getAllGuests(knex) {
        return knex.select('*').from('guests');
    },
    getGuestById(knex, attending_id) {
        return knex.from('guests').select('*').where('attending_id', attending_id).first();
    },
    insertGuest(knex, newGuest) {
        return knex
            .insert(newGuest)
            .into('guests')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteGuest(knex, attending_id) {
        return knex('guests')
            .where({ attending_id })
            .delete()
    },
    updateGuest(knex, attending_id, newGuestFields) {
        return knex('guests')
            .where({ attending_id })
            .update(newGuestFields)
    }
}

module.exports = GuestService;