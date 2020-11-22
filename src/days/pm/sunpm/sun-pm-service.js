const SunPMService = {
    getAllSunPM(knex) {
        return knex.select('*').from('sun_pm');
    },
    getSunPMById(knex, sun_pm_id) {
        return knex.from('sun_pm').select('*').where('sun_pm_id', sun_pm_id).first();
    },
    insertSunPM(knex, newSunPM) {
        return knex
            .insert(newSunPM)
            .into('sun_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteSunPM(knex, sun_pm_id) {
        return knex('sun_pm')
            .where({ sun_pm_id })
            .delete()
    },
    updateSunPM(knex, sun_pm_id, newSunPMFields) {
        return knex('sun_pm')
            .where({ sun_pm_id })
            .update(newSunPMFields)
    }
}

module.exports = SunPMService;