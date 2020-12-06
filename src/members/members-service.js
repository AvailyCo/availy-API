const MemberService = {
  getAllMembers(db) {
    return db
      .select('*')
      .from('group_members')
  },
  getGroupMembers(db, group_id) {
    return db
      .from('group_members')
      .select('*')
      .where({ group_id })
  },
  getMemberByID(db, member_id) {
    return db
      .from('group_members')
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
        MemberService.getMemberByID(db, member.member_id)
      );
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
  serializeMember(member) {
    return {
      grpMemsId: member.grpmemsid,
      group_id: member.group_id,
      member_id: member.member_id,
      member_level: member.member_level,
      join_date: member.join_date
    }
  }
}

module.exports = MemberService