function makeMembersArray(groups, users) {
  return [
    { // UserID 1 Founded GroupID 1
      grpMemsId: 1,
      group_id: groups[0],
      member_id: users[0],
      member_level: 'Founder',
      join_date: now()
    },
    { // UserID 2 Founded GroupID 2
      grpMemsId: 2,
      group_id: groups[1],
      member_id: users[1],
      member_level: 'Founder',
      join_date: now()
    },
    { // UserID 3 Applied to GroupID 1
      grpMemsId: 3,
      group_id: groups[0],
      member_id: users[2],
      member_level: 'Applicant',
      join_date: now()
    },
    { // UserID 2 Founded GroupID 3
      grpMemsId: 4,
      group_id: groups[2],
      member_id: users[1],
      member_level: 'Founder',
      join_date: now()
    },
    { // UserID 3 is Admin of GroupID 3
      grpMemsId: 5,
      group_id: groups[2],
      member_id: users[2],
      member_level: 'Admin',
      join_date: now()
    }
  ]
}
function makeExpectedMember(m){
  return {
    grpMemsId: m.grpMemsId,
    group_id: m.group_id,
    member_id: m.member_id,
    member_level: m.member_level,
    join_date: m.join_date
  }
}
function makeMaliciousMember(user, group){
  const maliciousMember = {
    grpMemsId: 911,
    group_id: group.groupId,
    member_id: user.userId,
    member_level: 'H4x0r <script>alert("xss");</script>',
    join_date: now()
  };
  const expectedMember = {
    ...makeExpectedMember([user], [group], maliciousMember),
    grpMemsId: 911,
    member_level: 'H4x0r &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
  };

  return {
    maliciousMember,
    expectedMember
  };
}


function seedMembers() {

}
function seedMaliciousMember() {
  
}



module.exports = {
  makeMembersArray,
  makeExpectedMember,
  makeMaliciousMember,

  seedMembers,
  seedMaliciousMember
}