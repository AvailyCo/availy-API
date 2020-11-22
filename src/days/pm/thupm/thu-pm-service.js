const ThuPMService = {
    getAllThuPM(knex) {
        return knex.select('*').from('thu_pm');
    },
    getThuPMById(knex, thu_pm_id) {
        return knex.from('thu_pm').select('*').where('thu_pm_id', thu_pm_id).first();
    },
    insertThuPM(knex, newThuPM) {
        return knex
            .insert(newThuPM)
            .into('thu_pm')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteThuPM(knex, thu_pm_id) {
        return knex('thu_pm')
            .where({ thu_pm_id })
            .delete()
    },
    updateThuPM(knex, thu_pm_id, newThuPMFields) {
        return knex('thu_pm')
            .where({ thu_pm_id })
            .update(newThuPMFields)
    }
}

module.exports = ThuPMService;