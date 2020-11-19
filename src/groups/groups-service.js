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
  getGroupMemberByID(db, member_id){
    return GroupService.getGroupMembers(db, member_id)
      .where({ member_id })
      .first();
  },
  addGroupMember(db, newMember) {
    return db
      .insert(newMember)
      .into('group_members')
      .returning('*')
      .then(([members]) => members)
      .then(member =>
        GroupService.getGroupMemberByID(db, member.member_id)  
      );
  },
  getGroupMembers(db, group_id) {
    return db
      .from('group_members')
      .select('*')
      .where({ group_id })
  },
  patchMember(db, member_id, newMemberData) {
    return db('group_members')
      .where({ member_id })
      .update(newMemberData);
  },
  removeMember(db, member_id) {
    return db('group_members')
      .where({ member_id })
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
  serializeMember(member) {
    return {
      grpMemsId: member.grpMemsId,
      member_id: member.member_id,
      member_level: member.member_level,
      join_date: member.join_date
    }
  }
}

module.exports = GroupService;