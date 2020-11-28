const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [{
    id: 1,
    username: 'Test User 1',
    firstname: 'Test2',
    lastname: 'User1',
    email: 'testuser1@test.com',
    password: 'Abc123!',
    aboutme: "Here's a little secret about User 1...",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-01-01T16:28:32.615Z'),
    date_modified: now(),
    timezone: 8,
    weekId: 1
  },
  {
    id: 2,
    username: 'Test User 2',
    firstname: 'Test2',
    lastname: 'User2',
    email: 'testuser2@123.com',
    password: 'Password123!',
    aboutme: "User 2 is all the rage in Boston",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-03-21T16:28:32.615Z'),
    date_modified: now(),
    timezone: 5,
    weekId: 1
  },
  {
    id: 3,
    username: 'Test User 3',
    firstname: 'Test3',
    lastname: 'User3',
    email: 'testuser3@sample.com',
    password: '321Password?',
    aboutme: "Here's a little secret about User 1...",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-01-01T16:28:32.615Z'),
    date_modified: now(),
    timezone: 1,
    weekId: 1
  }]
};

function makeGroupArray(users) {
  return [{
    id: 1,
    group_name: 'Test Group 1',
    group_image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    founder: users[0].id,
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
    id: 911,
    group_name: `H4x0r <script>alert("xss");</script>`,
    group_image: "https://via.placeholder.com/50x50?text=EVIL",
    founder: user.id,
    about_group: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    created_on: now()
  }
  const expectedGroup = {
    ...makeExpectedGroup([user], maliciousGroup),
    group_name: `H4x0r <script>alert("xss");</script>`,
    group_image: "https://via.placeholder.com/50x50?text=EVIL",
    founder: user.id,
    about_group: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
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

function cleanTables(db) {
  return db.transaction(trx => {
    trx.raw(
        `TRUNCATE
          users,
          contacts,
          events,
          hosts,
          guests,
          groups,
          group_members,
          week,
          timezone,
          sun_am,
          sun_pm,
          mon_am,
          mon_pm,
          tue_am,
          tue_pm,
          wed_am,
          wed_pm,
          thu_am,
          thu_pm,
          fri_am,
          fri_pm,
          sat_am,
          sat_pm
        `
    ).then(() => {
      Promise.all([
        trx.raw(`ALTER SEQUENCE sat_pm_sat_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sat_am_sat_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE fri_pm_fri_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE fri_am_fri_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE thu_pm_thu_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE thu_am_thu_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE wed_pm_wed_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE wed_am_wed_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tue_pm_tue_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE tue_am_tue_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE mon_pm_mon_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE mon_am_mon_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sun_pm_sun_pm_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sun_am_sun_am_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE timezone_timezoneid_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE week_weekid_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_userId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE contacts_contactId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE group_members_grpMemsId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE groups_groupId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE guests_attendingId_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE hosts_host_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE events_event_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('sat_pm_sat_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('sat_am_sat_am_id_seq', 0)`),
        trx.raw(`SELECT setval('fri_pm_fri_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('fri_am_fri_am_id_seq', 0)`),
        trx.raw(`SELECT setval('thu_pm_thu_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('thu_am_thu_am_id_seq', 0)`),
        trx.raw(`SELECT setval('wed_pm_wed_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('wed_am_wed_am_id_seq', 0)`),
        trx.raw(`SELECT setval('tue_pm_tue_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('tue_am_tue_am_id_seq', 0)`),
        trx.raw(`SELECT setval('mon_pm_mon_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('mon_am_mon_am_id_seq', 0)`),
        trx.raw(`SELECT setval('sun_pm_sun_pm_id_seq', 0)`),
        trx.raw(`SELECT setval('sun_am_sun_am_id_seq', 0)`),
        trx.raw(`SELECT setval('timezone_timezoneid_seq', 0)`),
        trx.raw(`SELECT setval('week_weekid_seq', 0)`),
        trx.raw(`SELECT setval('users_userId_seq', 0)`),
        trx.raw(`SELECT setval('contacts_contactId_seq', 0)`),
        trx.raw(`SELECT setval('group_members_grpMemsId_seq', 0)`),
        trx.raw(`SELECT setval('groups_groupId_seq', 0)`),
        trx.raw(`SELECT setval('guests_attendingId_seq', 0)`),
        trx.raw(`SELECT setval('hosts_host_id_seq', 0)`),
        trx.raw(`SELECT setval('events_event_id_seq', 0)`),
      ])
    })
  })
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));

  return db
    .into('users')
    .insert(preppedUsers)
    .then(() => 
    // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_userId_seq', ?)`, [users[users.lenfth - 1].id],
      )
    );
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

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.username,
      algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeGroupArray,
  makeGroupFixtures,
  makeExpectedGroup,
  makeMaliciousGroup,
  makeAuthHeader,
  seedUsers,
  seedGroupsTables,
  seedMaliciousGroup,
  cleanTables,
  seedUsers
}