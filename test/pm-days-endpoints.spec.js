const knex = require('knex')
const app = require('../src/app')
//const { makeSunPM, makeMonPM, makeTuePM, makeWedPM, makeThuPM, makeFriPM, makeSatPM } = require('./days-fixtures')

describe('PM Days Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE sat_PM, fri_PM, thu_PM, wed_PM, tue_PM, mon_PM, sun_PM RESTART IDENTITY CASCADE'))
    afterEach('cleanup', () => db.raw('TRUNCATE sat_PM, fri_PM, thu_PM, wed_PM, tue_PM, mon_PM, sun_PM RESTART IDENTITY CASCADE'))

    describe(`Unauthorized requests`, () => {
        const testPMSun = makeSunPM();
        const testPMMon = makeMonPM();
        const testPMTue = makeTuePM();
        const testPMWed = makeWedPM();
        const testPMThu = makeThuPM();
        const testPMFri = makeFriPM();
        const testPMSat = makeSatPM();

        beforeEach('insert sun pm days', () => {
            return db.into('sun_pm').insert(testPMSun);
        });
        beforeEach('insert mon pm days', () => {
            return db.into('mon_pm').insert(testPMMon);
        });
        beforeEach('insert tue pm days', () => {
            return db.into('tue_pm').insert(testPMTue);
        });
        beforeEach('insert wed pm days', () => {
            return db.into('wed_pm').insert(testPMWed);
        });
        beforeEach('insert thu pm days', () => {
            return db.into('thu_pm').insert(testPMThu);
        });
        beforeEach('insert fri pm days', () => {
            return db.into('fri_pm').insert(testPMFri);
        });
        beforeEach('insert sat pm days', () => {
            return db.into('sat_pm').insert(testPMSat);
        });

        /*Unauthorized Get all PM day data tests*/
        it(`responds with 401 Unauthorized for GET /api/SunPM`, () => {
            return supertest(app)
                .get('/api/SunPM')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/MonPM`, () => {
            return supertest(app)
                .get('/api/MonPM')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/TuePM`, () => {
            return supertest(app)
                .get('/api/TuePM')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/WedPM`, () => {
            return supertest(app)
                .get('/api/WedPM')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/ThuPM`, () => {
            return supertest(app)
                .get('/api/ThuPM')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/FriPM`, () => {
            return supertest(app)
                .get('/api/FriPM')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/SatPM`, () => {
            return supertest(app)
                .get('/api/SatPM')
                .expect(401, { error: 'Unauthorized request' });
        });

        /*Unauthorized GET Single PM day tests*/
        it(`responds with 401 Unauthorized for GET /api/SunPM/:sun_pm_id`, () => {
            const sunPMDay = testPMSun[1];
            return supertest(app)
                .get(`/api/SunPM/${sunPMDay.sun_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/MonPM/:mon_pm_id`, () => {
            const monPMDay = testPMMon[1];
            return supertest(app)
                .get(`/api/MonPM/${monPMDay.mon_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/TuePM/:tue_pm_id`, () => {
            const tuePMDay = testPMTue[1];
            return supertest(app)
                .get(`/api/TuePM/${tuePMDay.tue_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/WedPM/:wed_pm_id`, () => {
            const wedPMDay = testPMWed[1];
            return supertest(app)
                .get(`/api/WedPM/${wedPMDay.wed_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/ThuPM/:thu_pm_id`, () => {
            const thuPMDay = testPMThu[1];
            return supertest(app)
                .get(`/api/ThuPM/${thuPMDay.thu_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/FriPM/:fri_pm_id`, () => {
            const friPMDay = testPMFri[1];
            return supertest(app)
                .get(`/api/FriPM/${friPMDay.fri_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/SatPM/:sat_pm_id`, () => {
            const satPMDay = testPMSat[1];
            return supertest(app)
                .get(`/api/SatPM/${satPMDay.sat_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });










    });
});
