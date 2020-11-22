const SatPMService = {
    getAllSatPM(knex) {
        return knex.select('*').from('sat_pm');
    },
    getSatPMById(knex, sat_pm_id) {
        return knex.from('sat_pm').select('*').where('sat_pm_id', sat_pm_id).first();
    },
    insertSatPM(knex, newSatPM) {
        return knex
            .insert(newSatPM)
            .into('sat_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSatPM(knex, sat_pm_id) {
        return knex('sat_pm')
            .where({ sat_pm_id })
            .delete()
    },
    updateSatPM(knex, sat_pm_id, newSatPMFields) {
        return knex('sat_pm')
            .where({ sat_pm_id })
            .update(newSatPMFields)
    }
}

module.exports = SatPMService;