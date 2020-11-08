const HostsService = {
    getAllHosts(knex) {
        return knex.select('*').from('hosts');
    },
    getHostById(knex, host_id) {
        return knex.from('hosts').select('*').where('host_id', host_id).first();
    },
    insertHost(knex, newHost) {
        return knex
            .insert(newHost)
            .into('hosts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteHost(knex, host_id) {
        return knex('hosts')
            .where({ host_id })
            .delete()
    },
    updateHost(knex, host_id, newHostFields) {
        return knex('hosts')
            .where({ host_id })
            .update(newHostFields)
    }
}

module.exports = HostsService;