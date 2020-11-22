const FriPMService = {
    getAllFriPM(knex) {
        return knex.select('*').from('fri_pm');
    },
    getFriPMById(knex, fri_pm_id) {
        return knex.from('fri_pm').select('*').where('fri_pm_id', fri_pm_id).first();
    },
    insertFriPM(knex, newFriPM) {
        return knex
            .insert(newFriPM)
            .into('fri_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteFriPM(knex, fri_pm_id) {
        return knex('fri_pm')
            .where({ fri_pm_id })
            .delete()
    },
    updateFriPM(knex, fri_pm_id, newFriPMFields) {
        return knex('fri_pm')
            .where({ fri_pm_id })
            .update(newFriPMFields)
    }
}

module.exports = FriPMService;