function makeContactsArray() {
  return [
    {
      contactId: 1,
      user1_id: 1,
      user2_id: 2,
      blocked: false,
      blocked_by: null,
      date_connected: now()
    },
    {
      contactId: 2,
      user1_id: 1,
      user2_id: 3,
      blocked: true,
      blocked_by: 3,
      date_connected: now()
    },
    {
      contactId: 3,
      user1_id: 2,
      user2_id: 3,
      blocked: false,
      blocked_by: null,
      date_connected: now()
    }
  ]
}
function makeExpectedContact(c) {
  return {
    contactId: c.contactId,
    user1_id: c.user1_id,
    user2_id: c.user2_id,
    blocked: c.blocked,
    blocked_by: c.blocked_by,
    date_connected: c.date_connected
  }
}


function seedContacts() {

}

module.exports = {
  makeContactsArray,
  makeExpectedContact,

  seedContacts
}