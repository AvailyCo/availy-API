const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray(timezones, weeks) {
  return [{
    userId: 1,
    username: 'Test User 1',
    firstname: 'Test2',
    lastname: 'User1',
    email: 'testuser1@test.com',
    password: 'Abc123!',
    aboutme: "Here's a little secret about User 1...",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-01-01T16:28:32.615Z'),
    date_modified: now(),
    timezone: timezones[0].timezoneid,
    weekId: weeks[0].weekId
  },
  {
    userId: 2,
    username: 'Test User 2',
    firstname: 'Test2',
    lastname: 'User2',
    email: 'testuser2@123.com',
    password: 'Password123!',
    aboutme: "User 2 is all the rage in Boston",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-03-21T16:28:32.615Z'),
    date_modified: now(),
    timezone: timezones[1].timezoneid,
    weekId: weeks[1].weekId
  },
  {
    userId: 3,
    username: 'Test User 3',
    firstname: 'Test3',
    lastname: 'User3',
    email: 'testuser3@sample.com',
    password: '321Password?',
    aboutme: "Here's a little secret about User 1...",
    avatar: 'https://robohash.org/PA7.png?set=set4&size=150x150',
    date_created: new Date('2020-01-01T16:28:32.615Z'),
    date_modified: now(),
    timezone: timezones[2].timezoneid,
    weekId: weeks[2].weekId
  }]
};


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


module.exports = {
  makeUsersArray,
  seedUsers
}