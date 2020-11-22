const WedPMService = {
    getAllWedPM(knex) {
        return knex.select('*').from('wed_pm');
    },
    getWedPMById(knex, wed_pm_id) {
        return knex.from('wed_pm').select('*').where('wed_pm_id', wed_pm_id).first();
    },
    insertWedPM(knex, newWedPM) {
        return knex
            .insert(newWedPM)
            .into('wed_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteWedPM(knex, wed_pm_id) {
        return knex('wed_pm')
            .where({ wed_pm_id })
            .delete()
    },
    updateWedPM(knex, wed_pm_id, newWedPMFields) {
        return knex('wed_pm')
            .where({ wed_pm_id })
            .update(newWedPMFields)
    }
}

module.exports = WedPMService;