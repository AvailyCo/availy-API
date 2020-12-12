function makeGroupArray(users) {
  return [{
    id: 1,
    group_name: 'Test Group 1',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[0].userId,
    about_group: 'this is a bit of test info about Group 1',
    created_on: new Date('2029-01-22T16:28:32.615Z')
  },
  {
    id: 2,
    group_name: 'Test Group 2',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[0].userId,
    about_group: "Group 2's About Me looks something like this",
    created_on: new Date('2014-01-22T16:28:32.615Z')
  },
  {
    id: 3,
    group_name: 'Test Group 3',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[1].userId,
    about_group: 'Group 3 rules, Group 1 drools',
    created_on: new Date('2012-01-22T16:28:32.615Z')
  }]
}

function makeExpectedGroup(group) {
  return {
    id: group.id,
    group_name: group.group_name,
    group_image: group.group_image,
    founder: group.founder,
    about_group: group.about_group,
    created_on: group.created_on
  }
}
function makeMaliciousGroup(user) {
  const maliciousGroup = {
    groupId: 911,
    group_name: `H4x0r <script>alert("xss");</script>`,
    group_image: "https://via.placeholder.com/50x50?text=EVIL",
    founder: user.userId,
    about_group: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    created_on: now()
  }
  const expectedGroup = {
    ...makeExpectedGroup([user], maliciousGroup),
    group_name: `H4x0r &lt;script&gt;alert(\"xss\");&lt;/script&gt;`,
    group_image: "https://via.placeholder.com/50x50?text=EVIL",
    founder: user.userId,
    about_group: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    created_on: now()
  };
  return {
    maliciousGroup,
    expectedGroup,
  };
}



function makeGroupFixtures() {
  const testUsers = makeUsersArray();
  const testGroups = makeGroupArray(testUsers);

  return { testUsers, testGroups };
}



function seedGroupsTables(db, users, groups) {
  // use a transaction to group the queries. auto rollback on any failures
  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await trx.into('groups').insert(groups);
    // update the auto nce to match the rced id values
    await trx.raw(
      `SELECT setval('groups_groupId_seq', ?)`, [groups[groups.length - 1].id],
    );
  });
}
function seedMaliciousGroup(db, user, group) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('groups')
        .insert([group])
    );
}

module.exports = {
  makeGroupArray,
  makeExpectedGroup,
  makeMaliciousGroup,

  makeGroupFixtures,

  seedGroupsTables,
  seedMaliciousGroup
}