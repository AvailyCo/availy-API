const TuePMService = {
    getAllTuePM(knex) {
        return knex.select('*').from('tue_pm');
    },
    getTuePMById(knex, tue_pm_id) {
        return knex.from('tue_pm').select('*').where('tue_pm_id', tue_pm_id).first();
    },
    insertTuePM(knex, newTuePM) {
        return knex
            .insert(newTuePM)
            .into('tue_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteTuePM(knex, tue_pm_id) {
        return knex('tue_pm')
            .where({ tue_pm_id })
            .delete()
    },
    updateTuePM(knex, tue_pm_id, newTuePMFields) {
        return knex('tue_pm')
            .where({ tue_pm_id })
            .update(newTuePMFields)
    }
}

module.exports = TuePMService;