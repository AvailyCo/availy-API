const xss = require('xss');
//const bcrypt = require('bcryptjs');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  getAllUsers(db) {
    return db.select('*').from('users')
  },
  getById(db, userId) {
    return db.from('users').select('*').where('userid', userId || 0).first()
  },
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },
  patchUser(db, userid, newUserFields) {
    return db('users')
      .where({ userid })
      .update(newUserFields);
  },
  deleteUser(db, username) {
    return db('users')
      .where({ username })
      .delete()
  },
  validatePassword(password) {
    if (password.length < 6) {
      return 'Password must be longer than 6 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character'
    }
    return null
  },
  /*  hashPassword(password) {
         return bcrypt.hash(password, 12)
     }, */
  serializeUser(user) {
    return {
      userId: user.userId,
      firstname: xss(user.firstname),
      lastname: xss(user.lastname),
      email: xss(user.email),
      password: xss(user.password),
      aboutme: xss(user.aboutme),
      avatar: xss(user.avatar),
      date_created: new Date(user.date_created),
      date_modified: new Date(user.date_modified),
      timezone: user.timezone,
      weekId: user.weekId
    }
  },
}

module.exports = UsersService;