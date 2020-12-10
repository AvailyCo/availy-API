const MemberService = {
  getAllMembers(db) {
    return db
      .select('*')
      .from('group_members')
  },
  getMemberByID(db, grpmemsid) {
    return db
      .from('group_members')
      .where({ grpmemsid })
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
  patchMember(db, grpmemsid, newMemberData) {
    return db('group_members')
      .where({ grpmemsid })
      .update(newMemberData);
  },
  removeMember(db, grpmemsid) {
    return db('group_members')
      .where({ grpmemsid })
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