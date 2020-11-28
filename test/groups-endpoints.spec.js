const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Groups Endpoints', function() {
  let db;

  const {
    testUsers,
    testGroups,
    testMembers,
  } = helpers.makeGroupFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/groups', () => {
    context('Given no groups', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('./api/groups')
          .expect(200, []);
      });
    });

    context('Given there are groups in the database', () => {
      this.beforeEach('insert groups', () => {
        helpers.seedGroupsTables(
          db,
          testUsers,
          testGroups
        )
      })
    })
  })
})