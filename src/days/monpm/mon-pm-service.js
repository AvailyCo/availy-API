const MonPMService = {
    getAllMonPM(knex) {
        return knex.select('*').from('mon_pm');
    },
    getMonPMById(knex, mon_pm_id) {
        return knex.from('mon_pm').select('*').where('mon_pm_id', mon_pm_id).first();
    },
    insertMonPM(knex, newMonPM) {
        return knex
            .insert(newMonPM)
            .into('mon_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteMonPM(knex, mon_pm_id) {
        return knex('mon_pm')
            .where({ mon_pm_id })
            .delete()
    },
    updateMonPM(knex, mon_pm_id, newMonPMFields) {
        return knex('mon_pm')
            .where({ mon_pm_id })
            .update(newMonPMFields)
    }
}

module.exports = MonPMService;