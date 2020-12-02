const contactsService = {
  getAllContacts(db) {
    return db.select('*').from('contacts');
  },
  getUserContacts(db, userId) {
    return db('contacts')
      .select('*')
      .where('user1_id', userId)
      .orWhere('user2_id', userId);
  },
  addContact(db, newContact) {
    return db
      .insert(newContact)
      .into('contacts')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getContactId(db, user1, user2) {
    return db('contacts')
      .select('*')
      .where({
        user1_id: user1,
        user2_id: user2
      })
      .orWhere({
        user1_id: user2,
        user2_id: user1
      })
      .returning('contactid');
  },
  blockContact(db, contactId, blockStatus, userId) {
    return db('contacts')
      .where({ contactid: contactId })
      .update({
        blocked: blockStatus,
        blocked_by: userId
      })
      .returning('*');
  },
  deleteContact(db, contactId) {
    return db('contacts')
      .where({ contactid: contactId })
      .delete();
  },
}

module.exports = contactsService;