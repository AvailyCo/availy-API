const xss = require('xss');

const GroupService = {
  getAllGroups(db) {
    return db
      .select('*')
      .from('groups')
  },
  getGroupById(db, groupid) {
    return db
      .from('groups')
      .select('*')
      .where({ groupid })
      .first();
  },
  insertGroup(db, newGroup) {
    return db
      .insert(newGroup)
      .into('groups')
      .returning('*')
      .then(group => {
        return group[0];
      });
  },
  patchGroup(db, groupid, newGroupFields) {
    return db('groups')
      .where({ groupid })
      .update(newGroupFields);
  },
  deleteGroup(db, groupid) {
    return db('groups')
      .where({ groupid })
      .delete();
  },
  serializeGroup(group) {
    return {
      groupid: group.groupid,
      founder: group.founder,
      created_on: group.created_on,
      group_name: xss(group.group_name),
      group_image: group.group_image,
      about_group: xss(group.about_group),
    }
  },
}

module.exports = GroupService;