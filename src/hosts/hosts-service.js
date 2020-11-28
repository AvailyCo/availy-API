const HostsService = {
    getAllHosts(db) {
        return db.select('*').from('hosts');
    },
    getHostById(db, host_id) {
        return db.from('hosts').select('*').where('host_id', host_id).first();
    },
    insertHost(db, newHost) {
        return db
            .insert(newHost)
            .into('hosts')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteHost(db, host_id) {
        return db('hosts')
            .where({ host_id })
            .delete()
    },
    updateHost(db, host_id, newHostFields) {
        return db('hosts')
            .where({ host_id })
            .update(newHostFields)
    }
}

module.exports = HostsService;