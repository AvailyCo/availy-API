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

        /*Unauthorized POST PM day tests*/
        it(`responds with 401 Unauthorized for POST /api/SunPM`, () => {
            return supertest(app)
                .post('/api/SunPM')
                .send({
                    sun_pm12: 1,
                    sun_pm1230: 2,
                    sun_pm1: 3,
                    sun_pm130: 4,
                    sun_pm2: 5,
                    sun_pm230: 1,
                    sun_pm3: 2,
                    sun_pm330: 3,
                    sun_pm4: 4,
                    sun_pm430: 5,
                    sun_pm5: 1,
                    sun_pm530: 2,
                    sun_pm6: 3,
                    sun_pm630: 4,
                    sun_pm7: 5,
                    sun_pm730: 1,
                    sun_pm8: 2,
                    sun_pm830: 3,
                    sun_pm9: 4,
                    sun_pm930: 5,
                    sun_pm10: 1,
                    sun_pm1030: 2,
                    sun_pm11: 3,
                    sun_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/MonPM`, () => {
            return supertest(app)
                .post('/api/MonPM')
                .send({
                    mon_pm12: 1,
                    mon_pm1230: 2,
                    mon_pm1: 3,
                    mon_pm130: 4,
                    mon_pm2: 5,
                    mon_pm230: 1,
                    mon_pm3: 2,
                    mon_pm330: 3,
                    mon_pm4: 4,
                    mon_pm430: 5,
                    mon_pm5: 1,
                    mon_pm530: 2,
                    mon_pm6: 3,
                    mon_pm630: 4,
                    mon_pm7: 5,
                    mon_pm730: 1,
                    mon_pm8: 2,
                    mon_pm830: 3,
                    mon_pm9: 4,
                    mon_pm930: 5,
                    mon_pm10: 1,
                    mon_pm1030: 2,
                    mon_pm11: 3,
                    mon_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/TuePM`, () => {
            return supertest(app)
                .post('/api/TuePM')
                .send({
                    tue_pm12: 1,
                    tue_pm1230: 2,
                    tue_pm1: 3,
                    tue_pm130: 4,
                    tue_pm2: 5,
                    tue_pm230: 1,
                    tue_pm3: 2,
                    tue_pm330: 3,
                    tue_pm4: 4,
                    tue_pm430: 5,
                    tue_pm5: 1,
                    tue_pm530: 2,
                    tue_pm6: 3,
                    tue_pm630: 4,
                    tue_pm7: 5,
                    tue_pm730: 1,
                    tue_pm8: 2,
                    tue_pm830: 3,
                    tue_pm9: 4,
                    tue_pm930: 5,
                    tue_pm10: 1,
                    tue_pm1030: 2,
                    tue_pm11: 3,
                    tue_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/WedPM`, () => {
            return supertest(app)
                .post('/api/WedPM')
                .send({
                    wed_pm12: 1,
                    wed_pm1230: 2,
                    wed_pm1: 3,
                    wed_pm130: 4,
                    wed_pm2: 5,
                    wed_pm230: 1,
                    wed_pm3: 2,
                    wed_pm330: 3,
                    wed_pm4: 4,
                    wed_pm430: 5,
                    wed_pm5: 1,
                    wed_pm530: 2,
                    wed_pm6: 3,
                    wed_pm630: 4,
                    wed_pm7: 5,
                    wed_pm730: 1,
                    wed_pm8: 2,
                    wed_pm830: 3,
                    wed_pm9: 4,
                    wed_pm930: 5,
                    wed_pm10: 1,
                    wed_pm1030: 2,
                    wed_pm11: 3,
                    wed_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/ThuPM`, () => {
            return supertest(app)
                .post('/api/ThuPM')
                .send({
                    thu_pm12: 1,
                    thu_pm1230: 2,
                    thu_pm1: 3,
                    thu_pm130: 4,
                    thu_pm2: 5,
                    thu_pm230: 1,
                    thu_pm3: 2,
                    thu_pm330: 3,
                    thu_pm4: 4,
                    thu_pm430: 5,
                    thu_pm5: 1,
                    thu_pm530: 2,
                    thu_pm6: 3,
                    thu_pm630: 4,
                    thu_pm7: 5,
                    thu_pm730: 1,
                    thu_pm8: 2,
                    thu_pm830: 3,
                    thu_pm9: 4,
                    thu_pm930: 5,
                    thu_pm10: 1,
                    thu_pm1030: 2,
                    thu_pm11: 3,
                    thu_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/FriPM`, () => {
            return supertest(app)
                .post('/api/FriPM')
                .send({
                    fri_pm12: 1,
                    fri_pm1230: 2,
                    fri_pm1: 3,
                    fri_pm130: 4,
                    fri_pm2: 5,
                    fri_pm230: 1,
                    fri_pm3: 2,
                    fri_pm330: 3,
                    fri_pm4: 4,
                    fri_pm430: 5,
                    fri_pm5: 1,
                    fri_pm530: 2,
                    fri_pm6: 3,
                    fri_pm630: 4,
                    fri_pm7: 5,
                    fri_pm730: 1,
                    fri_pm8: 2,
                    fri_pm830: 3,
                    fri_pm9: 4,
                    fri_pm930: 5,
                    fri_pm10: 1,
                    fri_pm1030: 2,
                    fri_pm11: 3,
                    fri_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/SatPM`, () => {
            return supertest(app)
                .post('/api/SatPM')
                .send({
                    sat_pm12: 1,
                    sat_pm1230: 2,
                    sat_pm1: 3,
                    sat_pm130: 4,
                    sat_pm2: 5,
                    sat_pm230: 1,
                    sat_pm3: 2,
                    sat_pm330: 3,
                    sat_pm4: 4,
                    sat_pm430: 5,
                    sat_pm5: 1,
                    sat_pm530: 2,
                    sat_pm6: 3,
                    sat_pm630: 4,
                    sat_pm7: 5,
                    sat_pm730: 1,
                    sat_pm8: 2,
                    sat_pm830: 3,
                    sat_pm9: 4,
                    sat_pm930: 5,
                    sat_pm10: 1,
                    sat_pm1030: 2,
                    sat_pm11: 3,
                    sat_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        /*Unauthorized PATCH PM day tests*/
        it(`responds with 401 Unauthorized for PATCH /api/SunPM/:sun_pm_id`, () => {
            return supertest(app)
                .patch(`/api/SunPM/${sun_pm_id}`)
                .send({
                    sun_pm_id: 1,
                    sun_pm12: 1,
                    sun_pm1230: 1,
                    sun_pm1: 1,
                    sun_pm130: 1,
                    sun_pm2: 1,
                    sun_pm230: 1,
                    sun_pm3: 1,
                    sun_pm330: 1,
                    sun_pm4: 1,
                    sun_pm430: 1,
                    sun_pm5: 1,
                    sun_pm530: 1,
                    sun_pm6: 1,
                    sun_pm630: 1,
                    sun_pm7: 1,
                    sun_pm730: 1,
                    sun_pm8: 1,
                    sun_pm830: 1,
                    sun_pm9: 1,
                    sun_pm930: 1,
                    sun_pm10: 1,
                    sun_pm1030: 1,
                    sun_pm11: 1,
                    sun_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/MonPM/:mon_pm_id`, () => {
            return supertest(app)
                .patch(`/api/MonPM/${mon_pm_id}`)
                .send({
                    mon_pm_id: 1,
                    mon_pm12: 1,
                    mon_pm1230: 1,
                    mon_pm1: 1,
                    mon_pm130: 1,
                    mon_pm2: 1,
                    mon_pm230: 1,
                    mon_pm3: 1,
                    mon_pm330: 1,
                    mon_pm4: 1,
                    mon_pm430: 1,
                    mon_pm5: 1,
                    mon_pm530: 1,
                    mon_pm6: 1,
                    mon_pm630: 1,
                    mon_pm7: 1,
                    mon_pm730: 1,
                    mon_pm8: 1,
                    mon_pm830: 1,
                    mon_pm9: 1,
                    mon_pm930: 1,
                    mon_pm10: 1,
                    mon_pm1030: 1,
                    mon_pm11: 1,
                    mon_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/TuePM/:tue_pm_id`, () => {
            return supertest(app)
                .patch(`/api/TuePM/${tue_pm_id}`)
                .send({
                    tue_pm_id: 1,
                    tue_pm12: 1,
                    tue_pm1230: 1,
                    tue_pm1: 1,
                    tue_pm130: 1,
                    tue_pm2: 1,
                    tue_pm230: 1,
                    tue_pm3: 1,
                    tue_pm330: 1,
                    tue_pm4: 1,
                    tue_pm430: 1,
                    tue_pm5: 1,
                    tue_pm530: 1,
                    tue_pm6: 1,
                    tue_pm630: 1,
                    tue_pm7: 1,
                    tue_pm730: 1,
                    tue_pm8: 1,
                    tue_pm830: 1,
                    tue_pm9: 1,
                    tue_pm930: 1,
                    tue_pm10: 1,
                    tue_pm1030: 1,
                    tue_pm11: 1,
                    tue_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/WedPM/:wed_pm_id`, () => {
            return supertest(app)
                .patch(`/api/WedPM/${wed_pm_id}`)
                .send({
                    wed_pm_id: 1,
                    wed_pm12: 1,
                    wed_pm1230: 1,
                    wed_pm1: 1,
                    wed_pm130: 1,
                    wed_pm2: 1,
                    wed_pm230: 1,
                    wed_pm3: 1,
                    wed_pm330: 1,
                    wed_pm4: 1,
                    wed_pm430: 1,
                    wed_pm5: 1,
                    wed_pm530: 1,
                    wed_pm6: 1,
                    wed_pm630: 1,
                    wed_pm7: 1,
                    wed_pm730: 1,
                    wed_pm8: 1,
                    wed_pm830: 1,
                    wed_pm9: 1,
                    wed_pm930: 1,
                    wed_pm10: 1,
                    wed_pm1030: 1,
                    wed_pm11: 1,
                    wed_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/ThuPM/:thu_pm_id`, () => {
            return supertest(app)
                .patch(`/api/ThuPM/${thu_pm_id}`)
                .send({
                    thu_pm_id: 1,
                    thu_pm12: 1,
                    thu_pm1230: 1,
                    thu_pm1: 1,
                    thu_pm130: 1,
                    thu_pm2: 1,
                    thu_pm230: 1,
                    thu_pm3: 1,
                    thu_pm330: 1,
                    thu_pm4: 1,
                    thu_pm430: 1,
                    thu_pm5: 1,
                    thu_pm530: 1,
                    thu_pm6: 1,
                    thu_pm630: 1,
                    thu_pm7: 1,
                    thu_pm730: 1,
                    thu_pm8: 1,
                    thu_pm830: 1,
                    thu_pm9: 1,
                    thu_pm930: 1,
                    thu_pm10: 1,
                    thu_pm1030: 1,
                    thu_pm11: 1,
                    thu_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/FriPM/:fri_pm_id`, () => {
            return supertest(app)
                .patch(`/api/FriPM/${fri_pm_id}`)
                .send({
                    fri_pm_id: 1,
                    fri_pm12: 1,
                    fri_pm1230: 1,
                    fri_pm1: 1,
                    fri_pm130: 1,
                    fri_pm2: 1,
                    fri_pm230: 1,
                    fri_pm3: 1,
                    fri_pm330: 1,
                    fri_pm4: 1,
                    fri_pm430: 1,
                    fri_pm5: 1,
                    fri_pm530: 1,
                    fri_pm6: 1,
                    fri_pm630: 1,
                    fri_pm7: 1,
                    fri_pm730: 1,
                    fri_pm8: 1,
                    fri_pm830: 1,
                    fri_pm9: 1,
                    fri_pm930: 1,
                    fri_pm10: 1,
                    fri_pm1030: 1,
                    fri_pm11: 1,
                    fri_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/SatPM/:sat_pm_id`, () => {
            return supertest(app)
                .patch(`/api/SatPM/${sat_pm_id}`)
                .send({
                    sat_pm_id: 1,
                    sat_pm12: 1,
                    sat_pm1230: 1,
                    sat_pm1: 1,
                    sat_pm130: 1,
                    sat_pm2: 1,
                    sat_pm230: 1,
                    sat_pm3: 1,
                    sat_pm330: 1,
                    sat_pm4: 1,
                    sat_pm430: 1,
                    sat_pm5: 1,
                    sat_pm530: 1,
                    sat_pm6: 1,
                    sat_pm630: 1,
                    sat_pm7: 1,
                    sat_pm730: 1,
                    sat_pm8: 1,
                    sat_pm830: 1,
                    sat_pm9: 1,
                    sat_pm930: 1,
                    sat_pm10: 1,
                    sat_pm1030: 1,
                    sat_pm11: 1,
                    sat_pm1130: 1
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        /*Unauthorized DELETE PM day tests*/
        it(`responds with 401 Unauthorized for DELETE /api/SunPM/:sun_pm_id`, () => {
            const sunPMDay = testPMSun[1];
            return supertest(app)
                .delete(`/api/SunPM/${sunPMDay.sun_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/MonPM/:mon_pm_id`, () => {
            const monPMDay = testPMMon[1];
            return supertest(app)
                .delete(`/api/MonPM/${monPMDay.mon_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/TuePM/:tue_pm_id`, () => {
            const tuePMDay = testPMTue[1];
            return supertest(app)
                .delete(`/api/TuePM/${tuePMDay.tue_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/WedPM/:wed_pm_id`, () => {
            const wedPMDay = testPMWed[1];
            return supertest(app)
                .delete(`/api/WedPM/${wedPMDay.wed_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/ThuPM/:thu_pm_id`, () => {
            const thuPMDay = testPMThu[1];
            return supertest(app)
                .delete(`/api/ThuPM/${thuPMDay.thu_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/FriPM/:fri_pm_id`, () => {
            const friPMDay = testPMFri[1];
            return supertest(app)
                .delete(`/api/FriPM/${friPMDay.fri_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/SatPM/:sat_pm_id`, () => {
            const satPMDay = testPMSat[1];
            return supertest(app)
                .delete(`/api/SatPM/${satPMDay.sun_pm_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });
    });

    /*Tests getting all pm days data*/
    describe(`GET /api/SunPM`, () => {
        context(`Given no SunPM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/SunPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is SunPM data in the database', () => {
            const testSunPM = makeSunPM();

            beforeEach('insert SunPM data', () => {
                return db
                    .into('sun_pm')
                    .insert(testSunPM)
            })

            it('responds with 200 and all of the data for Sunday PM', () => {
                return supertest(app)
                    .get('/api/SunPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testSunPM)
            });
        });
    });

    describe(`GET /api/MonPM`, () => {
        context(`Given no MonPM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/MonPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is MonPM data in the database', () => {
            const testMonPM = makeMonPM();

            beforeEach('insert MonPM data', () => {
                return db
                    .into('mon_pm')
                    .insert(testMonPM)
            })

            it('responds with 200 and all of the data for Monday PM', () => {
                return supertest(app)
                    .get('/api/MonPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testMonPM)
            });
        });
    });

    describe(`GET /api/TuePM`, () => {
        context(`Given no TuePM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/TuePM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is TuePM data in the database', () => {
            const testTuePM = makeTuePM();

            beforeEach('insert TuePM data', () => {
                return db
                    .into('tue_pm')
                    .insert(testTuePM)
            })

            it('responds with 200 and all of the data for Tuesday PM', () => {
                return supertest(app)
                    .get('/api/TuePM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testTuePM)
            });
        });
    });

    describe(`GET /api/WedPM`, () => {
        context(`Given no WedPM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/WedPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is WedPM data in the database', () => {
            const testWedPM = makeWedPM();

            beforeEach('insert WedPM data', () => {
                return db
                    .into('we_pm')
                    .insert(testWedPM)
            })

            it('responds with 200 and all of the data for Wednesday PM', () => {
                return supertest(app)
                    .get('/api/WedPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testWedPM)
            });
        });
    });

    describe(`GET /api/ThuPM`, () => {
        context(`Given no ThuPM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/ThuPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is ThuPM data in the database', () => {
            const testThuPM = makeThuPM();

            beforeEach('insert ThuPM data', () => {
                return db
                    .into('thu_pm')
                    .insert(testThuPM)
            })

            it('responds with 200 and all of the data for Thursday PM', () => {
                return supertest(app)
                    .get('/api/ThuPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testThuPM)
            });
        });
    });

    describe(`GET /api/FriPM`, () => {
        context(`Given no FriPM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/FriPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is FriPM data in the database', () => {
            const testFriPM = makeSunPM();

            beforeEach('insert FriPM data', () => {
                return db
                    .into('fri_pm')
                    .insert(testFriPM)
            })

            it('responds with 200 and all of the data for Friday PM', () => {
                return supertest(app)
                    .get('/api/FriPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testFriPM)
            });
        });
    });

    describe(`GET /api/SatPM`, () => {
        context(`Given no SatPM data `, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/SatPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there is SatPM data in the database', () => {
            const testSatPM = makeSatPM();

            beforeEach('insert SatPM data', () => {
                return db
                    .into('sat_pm')
                    .insert(testSatPM)
            })

            it('responds with 200 and all of the data for Saturday PM', () => {
                return supertest(app)
                    .get('/api/SatPM')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testSatPM)
            });
        });
    });

    /*Tests getting all single PM days*/
    describe(`GET /api/SunPM/:sun_pm_id`, () => {
        context(`Given no SunPM data`, () => {
            it(`responds with 404`, () => {
                const sunId = 123456;
                return supertest(app)
                    .get(`/api/SunPM/${sun_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `SunPM Not Found` } });
            });
        });

        context('Given there is SunPM data in the database', () => {
            const testSunPM = makeSunPM();

            beforeEach('insert SunPM data', () => {
                return db.into('sun_pm').insert(testSunPM);
            });

            it('responds with 200 and the specified SunPM data', () => {
                const sunId = 2;
                const expectedSunPM = testSunPM[sunId - 1];
                return supertest(app)
                    .get(`/api/SunPM/${sun_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedSunPM);
            });
        });
    });

    describe(`GET /api/MonPM/:mon_pm_id`, () => {
        context(`Given no MonPM data`, () => {
            it(`responds with 404`, () => {
                return supertest(app)
                    .get(`/api/MonPM/${mon_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `MonPM Not Found` } });
            });
        });

        context('Given there is MonPM data in the database', () => {
            const testMonPM = makeMonPM();

            beforeEach('insert MonPM data', () => {
                return db.into('mon_pm').insert(testMonPM);
            });

            it('responds with 200 and the specified MonPM data', () => {
                const monId = 2;
                const expectedMonPM = testMonPM[monId - 1];
                return supertest(app)
                    .get(`/api/MonPM/${mon_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedMonPM);
            });
        });
    });

    describe(`GET /api/TuePM/:tue_pm_id`, () => {
        context(`Given no TuePM data`, () => {
            it(`responds with 404`, () => {
                return supertest(app)
                    .get(`/api/TuePM/${tue_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `TuePM Not Found` } });
            });
        });

        context('Given there is TuePM data in the database', () => {
            const testTuePM = makeTuePM();

            beforeEach('insert TuePM data', () => {
                return db.into('tue_pm').insert(testTuePM);
            });

            it('responds with 200 and the specified TuePM data', () => {
                const tueId = 2;
                const expectedTuePM = testTuePM[tueId - 1];
                return supertest(app)
                    .get(`/api/TuePM/${tue_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedTuePM);
            });
        });
    });

    describe(`GET /api/WedPM/:wed_pm_id`, () => {
        context(`Given no WedPM data`, () => {
            it(`responds with 404`, () => {
                return supertest(app)
                    .get(`/api/WedPM/${wed_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `WedPM Not Found` } });
            });
        });

        context('Given there is WedPM data in the database', () => {
            const testWedPM = makeWedPM();

            beforeEach('insert WedPM data', () => {
                return db.into('wed_pm').insert(testWedPM);
            });

            it('responds with 200 and the specified WedPM data', () => {
                const wedId = 2;
                const expectedWedPM = testWedPM[wedId - 1];
                return supertest(app)
                    .get(`/api/WedPM/${wed_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedWedPM);
            });
        });
    });

    describe(`GET /api/ThuPM/thu_pm_id`, () => {
        context(`Given no ThuPM data`, () => {
            it(`responds with 404`, () => {
                return supertest(app)
                    .get(`/api/ThuPM/${thu_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `ThuPM Not Found` } });
            });
        });

        context('Given there is ThuPM data in the database', () => {
            const testThuPM = makeThuPM();

            beforeEach('insert ThuPM data', () => {
                return db.into('thu_pm').insert(testThuPM);
            });

            it('responds with 200 and the specified ThuPM data', () => {
                const thuId = 2;
                const expectedThuPM = testThuPM[thuId - 1];
                return supertest(app)
                    .get(`/api/ThuPM/${thu_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedThuPM);
            });
        });
    });

    describe(`GET /api/FriPM/:fri_pm_id`, () => {
        context(`Given no FriPM data`, () => {
            it(`responds with 404`, () => {
                return supertest(app)
                    .get(`/api/FriPM/${fri_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `FriPM Not Found` } });
            });
        });

        context('Given there is FriPM data in the database', () => {
            const testFriPM = makeFriPM();

            beforeEach('insert FriPM data', () => {
                return db.into('fri_pm').insert(testFriPM);
            });

            it('responds with 200 and the specified FriPM data', () => {
                const friId = 2;
                const expectedFriPM = testFriPM[friId - 1];
                return supertest(app)
                    .get(`/api/FriPM/${fri_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedFriPM);
            });
        });
    });

    describe(`GET /api/SatPM/:sat_pm_id`, () => {
        context(`Given no SatPM data`, () => {
            it(`responds with 404`, () => {
                return supertest(app)
                    .get(`/api/SatPM/${sat_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `SatPM Not Found` } });
            });
        });

        context('Given there is SatPM data in the database', () => {
            const testSatPM = makeSatPM();

            beforeEach('insert SatPM data', () => {
                return db.into('sat_pm').insert(testSatPM);
            });

            it('responds with 200 and the specified SatPM data', () => {
                const satId = 2;
                const expectedSatPM = testSatPM[satId - 1];
                return supertest(app)
                    .get(`/api/SatPM/${sat_pm_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedSatPM);
            });
        });
    });

    /*POST PM days tests*/
    describe(`POST /api/SunPM`, () => {
        const testSunPM = makeSunPM();
        const newSunPM = {
            sun_pm12: 1,
            sun_pm1230: 2,
            sun_pm1: 3,
            sun_pm130: 4,
            sun_pm2: 5,
            sun_pm230: 1,
            sun_pm3: 2,
            sun_pm330: 3,
            sun_pm4: 4,
            sun_pm430: 5,
            sun_pm5: 1,
            sun_pm530: 2,
            sun_pm6: 3,
            sun_pm630: 4,
            sun_pm7: 5,
            sun_pm730: 1,
            sun_pm8: 2,
            sun_pm830: 3,
            sun_pm9: 4,
            sun_pm930: 5,
            sun_pm10: 1,
            sun_pm1030: 2,
            sun_pm11: 3,
            sun_pm1130: 1
        }

        beforeEach('insert SunPM data', () => {
            return db
                .into('sun_pm')
                .insert(testSunPM)
        })

        it(`creates a SunPM data, responding with 201 and the new SunPM data`, () => {
            return supertest(app)
                .post('/api/SunPM')
                .send(newSunPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newSunPM.title)
                    expect(res.body).to.have.property('sun_pm_id')
                    expect(res.headers.location).to.eql(`/api/SunPM/${res.body.sun_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/SunPM/${res.body.sun_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['sun_pm12', 'sun_pm1230', 'sun_pm1', 'sun_pm130', 'sun_pm2', 'sun_pm230', 'sun_pm3', 'sun_pm330', 'sun_pm4', 'sun_pm430', 'sun_pm5', 'sun_pm530', 'sun_pm6', 'sun_pm630', 'sun_pm7', 'sun_pm730', 'sun_pm8', 'sun_pm830', 'sun_pm9', 'sun_pm930', 'sun_pm10', 'sun_pm1030', 'sun_pm11', 'sun_pm1130']
        requiredFields.forEach(field => {
            const newSunPM = {
                sun_pm12: 1,
                sun_pm1230: 2,
                sun_pm1: 3,
                sun_pm130: 4,
                sun_pm2: 5,
                sun_pm230: 1,
                sun_pm3: 2,
                sun_pm330: 3,
                sun_pm4: 4,
                sun_pm430: 5,
                sun_pm5: 1,
                sun_pm530: 2,
                sun_pm6: 3,
                sun_pm630: 4,
                sun_pm7: 5,
                sun_pm730: 1,
                sun_pm8: 2,
                sun_pm830: 3,
                sun_pm9: 4,
                sun_pm930: 5,
                sun_pm10: 1,
                sun_pm1030: 2,
                sun_pm11: 3,
                sun_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newSunPM[field]

                return supertest(app)
                    .post('/api/SunPM')
                    .send(newSunPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/MonPM`, () => {
        const testMonPM = makeMonPM();
        const newMonPM = {
            mon_pm12: 1,
            mon_pm1230: 2,
            mon_pm1: 3,
            mon_pm130: 4,
            mon_pm2: 5,
            mon_pm230: 1,
            mon_pm3: 2,
            mon_pm330: 3,
            mon_pm4: 4,
            mon_pm430: 5,
            mon_pm5: 1,
            mon_pm530: 2,
            mon_pm6: 3,
            mon_pm630: 4,
            mon_pm7: 5,
            mon_pm730: 1,
            mon_pm8: 2,
            mon_pm830: 3,
            mon_pm9: 4,
            mon_pm930: 5,
            mon_pm10: 1,
            mon_pm1030: 2,
            mon_pm11: 3,
            mon_pm1130: 1
        }

        beforeEach('insert MonPM data', () => {
            return db
                .into('mon_pm')
                .insert(testMonPM)
        })

        it(`creates a MonPM data, responding with 201 and the new MonPM data`, () => {
            return supertest(app)
                .post('/api/MonPM')
                .send(newMonPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newMonPM.title)
                    expect(res.body).to.have.property('mon_pm_id')
                    expect(res.headers.location).to.eql(`/api/MonPM/${res.body.mon_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/MonPM/${res.body.mon_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['mon_pm12', 'mon_pm1230', 'mon_pm1', 'mon_pm130', 'mon_pm2', 'mon_pm230', 'mon_pm3', 'mon_pm330', 'mon_pm4', 'mon_pm430', 'mon_pm5', 'mon_pm530', 'mon_pm6', 'mon_pm630', 'mon_pm7', 'mon_pm730', 'mon_pm8', 'mon_pm830', 'mon_pm9', 'mon_pm930', 'mon_pm10', 'mon_pm1030', 'mon_pm11', 'mon_pm1130']
        requiredFields.forEach(field => {
            const newMonPM = {
                mon_pm12: 1,
                mon_pm1230: 2,
                mon_pm1: 3,
                mon_pm130: 4,
                mon_pm2: 5,
                mon_pm230: 1,
                mon_pm3: 2,
                mon_pm330: 3,
                mon_pm4: 4,
                mon_pm430: 5,
                mon_pm5: 1,
                mon_pm530: 2,
                mon_pm6: 3,
                mon_pm630: 4,
                mon_pm7: 5,
                mon_pm730: 1,
                mon_pm8: 2,
                mon_pm830: 3,
                mon_pm9: 4,
                mon_pm930: 5,
                mon_pm10: 1,
                mon_pm1030: 2,
                mon_pm11: 3,
                mon_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newMonPM[field]

                return supertest(app)
                    .post('/api/MonPM')
                    .send(newMonPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/TuePM`, () => {
        const testTuePM = makeTuePM();
        const newTuePM = {
            tue_pm12: 1,
            tue_pm1230: 2,
            tue_pm1: 3,
            tue_pm130: 4,
            tue_pm2: 5,
            tue_pm230: 1,
            tue_pm3: 2,
            tue_pm330: 3,
            tue_pm4: 4,
            tue_pm430: 5,
            tue_pm5: 1,
            tue_pm530: 2,
            tue_pm6: 3,
            tue_pm630: 4,
            tue_pm7: 5,
            tue_pm730: 1,
            tue_pm8: 2,
            tue_pm830: 3,
            tue_pm9: 4,
            tue_pm930: 5,
            tue_pm10: 1,
            tue_pm1030: 2,
            tue_pm11: 3,
            tue_pm1130: 1
        }

        beforeEach('insert TuePM data', () => {
            return db
                .into('tue_pm')
                .insert(testTuePM)
        })

        it(`creates a TuePM data, responding with 201 and the new TuePM data`, () => {
            return supertest(app)
                .post('/api/TuePM')
                .send(newTuePM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newTuePM.title)
                    expect(res.body).to.have.property('tue_pm_id')
                    expect(res.headers.location).to.eql(`/api/TuePM/${res.body.tue_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/TuePM/${res.body.tue_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['tue_pm12', 'tue_pm1230', 'tue_pm1', 'tue_pm130', 'tue_pm2', 'tue_pm230', 'tue_pm3', 'tue_pm330', 'tue_pm4', 'tue_pm430', 'tue_pm5', 'tue_pm530', 'tue_pm6', 'tue_pm630', 'tue_pm7', 'tue_pm730', 'tue_pm8', 'tue_pm830', 'tue_pm9', 'tue_pm930', 'tue_pm10', 'tue_pm1030', 'tue_pm11', 'tue_pm1130']
        requiredFields.forEach(field => {
            const newTuePM = {
                tue_pm12: 1,
                tue_pm1230: 2,
                tue_pm1: 3,
                tue_pm130: 4,
                tue_pm2: 5,
                tue_pm230: 1,
                tue_pm3: 2,
                tue_pm330: 3,
                tue_pm4: 4,
                tue_pm430: 5,
                tue_pm5: 1,
                tue_pm530: 2,
                tue_pm6: 3,
                tue_pm630: 4,
                tue_pm7: 5,
                tue_pm730: 1,
                tue_pm8: 2,
                tue_pm830: 3,
                tue_pm9: 4,
                tue_pm930: 5,
                tue_pm10: 1,
                tue_pm1030: 2,
                tue_pm11: 3,
                tue_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newTuePM[field]

                return supertest(app)
                    .post('/api/TuePM')
                    .send(newTuePM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/WedPM`, () => {
        const testWedPM = makeWedPM();
        const newWedPM = {
            wed_pm12: 1,
            wed_pm1230: 2,
            wed_pm1: 3,
            wed_pm130: 4,
            wed_pm2: 5,
            wed_pm230: 1,
            wed_pm3: 2,
            wed_pm330: 3,
            wed_pm4: 4,
            wed_pm430: 5,
            wed_pm5: 1,
            wed_pm530: 2,
            wed_pm6: 3,
            wed_pm630: 4,
            wed_pm7: 5,
            wed_pm730: 1,
            wed_pm8: 2,
            wed_pm830: 3,
            wed_pm9: 4,
            wed_pm930: 5,
            wed_pm10: 1,
            wed_pm1030: 2,
            wed_pm11: 3,
            wed_pm1130: 1
        }

        beforeEach('insert WedPM data', () => {
            return db
                .into('wed_pm')
                .insert(testWedPM)
        })

        it(`creates a WedPM data, responding with 201 and the new WedPM data`, () => {
            return supertest(app)
                .post('/api/WedPM')
                .send(newWedPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newWedPM.title)
                    expect(res.body).to.have.property('wed_pm_id')
                    expect(res.headers.location).to.eql(`/api/WedPM/${res.body.wed_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/WedPM/${res.body.wed_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['wed_pm12', 'wed_pm1230', 'wed_pm1', 'wed_pm130', 'wed_pm2', 'wed_pm230', 'wed_pm3', 'wed_pm330', 'wed_pm4', 'wed_pm430', 'wed_pm5', 'wed_pm530', 'wed_pm6', 'wed_pm630', 'wed_pm7', 'wed_pm730', 'wed_pm8', 'wed_pm830', 'wed_pm9', 'wed_pm930', 'wed_pm10', 'wed_pm1030', 'wed_pm11', 'wed_pm1130']
        requiredFields.forEach(field => {
            const newWedPM = {
                wed_pm12: 1,
                wed_pm1230: 2,
                wed_pm1: 3,
                wed_pm130: 4,
                wed_pm2: 5,
                wed_pm230: 1,
                wed_pm3: 2,
                wed_pm330: 3,
                wed_pm4: 4,
                wed_pm430: 5,
                wed_pm5: 1,
                wed_pm530: 2,
                wed_pm6: 3,
                wed_pm630: 4,
                wed_pm7: 5,
                wed_pm730: 1,
                wed_pm8: 2,
                wed_pm830: 3,
                wed_pm9: 4,
                wed_pm930: 5,
                wed_pm10: 1,
                wed_pm1030: 2,
                wed_pm11: 3,
                wed_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newWedPM[field]

                return supertest(app)
                    .post('/api/WedPM')
                    .send(newWedPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/WedPM`, () => {
        const testWedPM = makeWedPM();
        const newWedPM = {
            wed_pm12: 1,
            wed_pm1230: 2,
            wed_pm1: 3,
            wed_pm130: 4,
            wed_pm2: 5,
            wed_pm230: 1,
            wed_pm3: 2,
            wed_pm330: 3,
            wed_pm4: 4,
            wed_pm430: 5,
            wed_pm5: 1,
            wed_pm530: 2,
            wed_pm6: 3,
            wed_pm630: 4,
            wed_pm7: 5,
            wed_pm730: 1,
            wed_pm8: 2,
            wed_pm830: 3,
            wed_pm9: 4,
            wed_pm930: 5,
            wed_pm10: 1,
            wed_pm1030: 2,
            wed_pm11: 3,
            wed_pm1130: 1
        }

        beforeEach('insert WedPM data', () => {
            return db
                .into('wed_pm')
                .insert(testWedPM)
        })

        it(`creates a WedPM data, responding with 201 and the new WedPM data`, () => {
            return supertest(app)
                .post('/api/WedPM')
                .send(newWedPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newWedPM.title)
                    expect(res.body).to.have.property('wed_pm_id')
                    expect(res.headers.location).to.eql(`/api/WedPM/${res.body.wed_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/WedPM/${res.body.wed_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['wed_pm12', 'wed_pm1230', 'wed_pm1', 'wed_pm130', 'wed_pm2', 'wed_pm230', 'wed_pm3', 'wed_pm330', 'wed_pm4', 'wed_pm430', 'wed_pm5', 'wed_pm530', 'wed_pm6', 'wed_pm630', 'wed_pm7', 'wed_pm730', 'wed_pm8', 'wed_pm830', 'wed_pm9', 'wed_pm930', 'wed_pm10', 'wed_pm1030', 'wed_pm11', 'wed_pm1130']
        requiredFields.forEach(field => {
            const newWedPM = {
                wed_pm12: 1,
                wed_pm1230: 2,
                wed_pm1: 3,
                wed_pm130: 4,
                wed_pm2: 5,
                wed_pm230: 1,
                wed_pm3: 2,
                wed_pm330: 3,
                wed_pm4: 4,
                wed_pm430: 5,
                wed_pm5: 1,
                wed_pm530: 2,
                wed_pm6: 3,
                wed_pm630: 4,
                wed_pm7: 5,
                wed_pm730: 1,
                wed_pm8: 2,
                wed_pm830: 3,
                wed_pm9: 4,
                wed_pm930: 5,
                wed_pm10: 1,
                wed_pm1030: 2,
                wed_pm11: 3,
                wed_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newWedPM[field]

                return supertest(app)
                    .post('/api/WedPM')
                    .send(newWedPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/ThuPM`, () => {
        const testThuPM = makeThuPM();
        const newThuPM = {
            thu_pm12: 1,
            thu_pm1230: 2,
            thu_pm1: 3,
            thu_pm130: 4,
            thu_pm2: 5,
            thu_pm230: 1,
            thu_pm3: 2,
            thu_pm330: 3,
            thu_pm4: 4,
            thu_pm430: 5,
            thu_pm5: 1,
            thu_pm530: 2,
            thu_pm6: 3,
            thu_pm630: 4,
            thu_pm7: 5,
            thu_pm730: 1,
            thu_pm8: 2,
            thu_pm830: 3,
            thu_pm9: 4,
            thu_pm930: 5,
            thu_pm10: 1,
            thu_pm1030: 2,
            thu_pm11: 3,
            thu_pm1130: 1
        }

        beforeEach('insert ThuPM data', () => {
            return db
                .into('thu_pm')
                .insert(testThuPM)
        })

        it(`creates a ThuPM data, responding with 201 and the new ThuPM data`, () => {
            return supertest(app)
                .post('/api/ThuPM')
                .send(newThuPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newThuPM.title)
                    expect(res.body).to.have.property('thu_pm_id')
                    expect(res.headers.location).to.eql(`/api/ThuPM/${res.body.thu_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/ThuPM/${res.body.thu_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['thu_pm12', 'thu_pm1230', 'thu_pm1', 'thu_pm130', 'thu_pm2', 'thu_pm230', 'thu_pm3', 'thu_pm330', 'thu_pm4', 'thu_pm430', 'thu_pm5', 'thu_pm530', 'thu_pm6', 'thu_pm630', 'thu_pm7', 'thu_pm730', 'thu_pm8', 'thu_pm830', 'thu_pm9', 'thu_pm930', 'thu_pm10', 'thu_pm1030', 'thu_pm11', 'thu_pm1130']
        requiredFields.forEach(field => {
            const newThuPM = {
                thu_pm12: 1,
                thu_pm1230: 2,
                thu_pm1: 3,
                thu_pm130: 4,
                thu_pm2: 5,
                thu_pm230: 1,
                thu_pm3: 2,
                thu_pm330: 3,
                thu_pm4: 4,
                thu_pm430: 5,
                thu_pm5: 1,
                thu_pm530: 2,
                thu_pm6: 3,
                thu_pm630: 4,
                thu_pm7: 5,
                thu_pm730: 1,
                thu_pm8: 2,
                thu_pm830: 3,
                thu_pm9: 4,
                thu_pm930: 5,
                thu_pm10: 1,
                thu_pm1030: 2,
                thu_pm11: 3,
                thu_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newThuPM[field]

                return supertest(app)
                    .post('/api/ThuPM')
                    .send(newThuPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/FriPM`, () => {
        const testFriPM = makeFriPM();
        const newFriPM = {
            fri_pm12: 1,
            fri_pm1230: 2,
            fri_pm1: 3,
            fri_pm130: 4,
            fri_pm2: 5,
            fri_pm230: 1,
            fri_pm3: 2,
            fri_pm330: 3,
            fri_pm4: 4,
            fri_pm430: 5,
            fri_pm5: 1,
            fri_pm530: 2,
            fri_pm6: 3,
            fri_pm630: 4,
            fri_pm7: 5,
            fri_pm730: 1,
            fri_pm8: 2,
            fri_pm830: 3,
            fri_pm9: 4,
            fri_pm930: 5,
            fri_pm10: 1,
            fri_pm1030: 2,
            fri_pm11: 3,
            fri_pm1130: 1
        }

        beforeEach('insert FriPM data', () => {
            return db
                .into('fri_pm')
                .insert(testFriPM)
        })

        it(`creates a FriPM data, responding with 201 and the new FriPM data`, () => {
            return supertest(app)
                .post('/api/FriPM')
                .send(newFriPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newFriPM.title)
                    expect(res.body).to.have.property('fri_pm_id')
                    expect(res.headers.location).to.eql(`/api/FriPM/${res.body.fri_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/FriPM/${res.body.fri_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['fri_pm12', 'fri_pm1230', 'fri_pm1', 'fri_pm130', 'fri_pm2', 'fri_pm230', 'fri_pm3', 'fri_pm330', 'fri_pm4', 'fri_pm430', 'fri_pm5', 'fri_pm530', 'fri_pm6', 'fri_pm630', 'fri_pm7', 'fri_pm730', 'fri_pm8', 'fri_pm830', 'fri_pm9', 'fri_pm930', 'fri_pm10', 'fri_pm1030', 'fri_pm11', 'fri_pm1130']
        requiredFields.forEach(field => {
            const newFriPM = {
                fri_pm12: 1,
                fri_pm1230: 2,
                fri_pm1: 3,
                fri_pm130: 4,
                fri_pm2: 5,
                fri_pm230: 1,
                fri_pm3: 2,
                fri_pm330: 3,
                fri_pm4: 4,
                fri_pm430: 5,
                fri_pm5: 1,
                fri_pm530: 2,
                fri_pm6: 3,
                fri_pm630: 4,
                fri_pm7: 5,
                fri_pm730: 1,
                fri_pm8: 2,
                fri_pm830: 3,
                fri_pm9: 4,
                fri_pm930: 5,
                fri_pm10: 1,
                fri_pm1030: 2,
                fri_pm11: 3,
                fri_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newFriPM[field]

                return supertest(app)
                    .post('/api/FriPM')
                    .send(newFriPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    describe(`POST /api/SatPM`, () => {
        const testSatPM = makeSatPM();
        const newSatPM = {
            sat_pm12: 1,
            sat_pm1230: 2,
            sat_pm1: 3,
            sat_pm130: 4,
            sat_pm2: 5,
            sat_pm230: 1,
            sat_pm3: 2,
            sat_pm330: 3,
            sat_pm4: 4,
            sat_pm430: 5,
            sat_pm5: 1,
            sat_pm530: 2,
            sat_pm6: 3,
            sat_pm630: 4,
            sat_pm7: 5,
            sat_pm730: 1,
            sat_pm8: 2,
            sat_pm830: 3,
            sat_pm9: 4,
            sat_pm930: 5,
            sat_pm10: 1,
            sat_pm1030: 2,
            sat_pm11: 3,
            sat_pm1130: 1
        }

        beforeEach('insert SatPM data', () => {
            return db
                .into('sat_pm')
                .insert(testSatPM)
        })

        it(`creates a SatPM data, responding with 201 and the new SatPM data`, () => {
            return supertest(app)
                .post('/api/SatPM')
                .send(newSatPM)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.title).to.eql(newSatPM.title)
                    expect(res.body).to.have.property('sat_pm_id')
                    expect(res.headers.location).to.eql(`/api/SatPM/${res.body.sat_pm_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/SatPM/${res.body.sat_pm_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['sat_pm12', 'sat_pm1230', 'sat_pm1', 'sat_pm130', 'sat_pm2', 'sat_pm230', 'sat_pm3', 'sat_pm330', 'sat_pm4', 'sat_pm430', 'sat_pm5', 'sat_pm530', 'sat_pm6', 'sat_pm630', 'sat_pm7', 'sat_pm730', 'sat_pm8', 'sat_pm830', 'sat_pm9', 'sat_pm930', 'sat_pm10', 'sat_pm1030', 'sat_pm11', 'sat_pm1130']
        requiredFields.forEach(field => {
            const newSatPM = {
                sat_pm12: 1,
                sat_pm1230: 2,
                sat_pm1: 3,
                sat_pm130: 4,
                sat_pm2: 5,
                sat_pm230: 1,
                sat_pm3: 2,
                sat_pm330: 3,
                sat_pm4: 4,
                sat_pm430: 5,
                sat_pm5: 1,
                sat_pm530: 2,
                sat_pm6: 3,
                sat_pm630: 4,
                sat_pm7: 5,
                sat_pm730: 1,
                sat_pm8: 2,
                sat_pm830: 3,
                sat_pm9: 4,
                sat_pm930: 5,
                sat_pm10: 1,
                sat_pm1030: 2,
                sat_pm11: 3,
                sat_pm1130: 1
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newSatPM[field]

                return supertest(app)
                    .post('/api/SatPM')
                    .send(newSatPM)
                    .expect(400, {
                        error: { message: `Missing '${field}' in request body` }
                    })
            })
        })
    });

    /*DELETE PM days tests*/
    describe(`DELETE /api/SunPM/:sun_pm_id`, () => {
        context(`Given no SunPM Data`, () => {
            it(`responds with 404`, () => {
                const SunPMId = 123456
                return supertest(app)
                    .delete(`/api/SunPM/${SunPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `SunPM data does not exist` } })
            });
        });

        context('Given there is SunPM data in the database', () => {
            const testSunPM = makeSunPM()

            beforeEach('insert SunPM data', () => {
                return db
                    .into('sun_pm')
                    .insert(testSunPM)
            })

            it('responds with 204 and removes the SunPM data', () => {
                const idToRemove = 2
                const expectedSunPM = testSunPM.filter(SunPM => SunPM.sun_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/SunPM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/SunPM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedSunPM)
                    );
            });
        });
    });

    describe(`DELETE /api/MonPM/:mon_pm_id`, () => {
        context(`Given no MonPM Data`, () => {
            it(`responds with 404`, () => {
                const MonPMId = 123456
                return supertest(app)
                    .delete(`/api/MonPM/${MonPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `MonPM data does not exist` } })
            });
        });

        context('Given there is MonPM data in the database', () => {
            const testMonPM = makeMonPM()

            beforeEach('insert MonPM data', () => {
                return db
                    .into('mon_pm')
                    .insert(testMonPM)
            })

            it('responds with 204 and removes the MonPM data', () => {
                const idToRemove = 2
                const expectedMonPM = testMonPM.filter(MonPM => MonPM.mon_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/MonPM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/MonPM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedMonPM)
                    );
            });
        });
    });

    describe(`DELETE /api/TuePM/:tue_pm_id`, () => {
        context(`Given no TuePM Data`, () => {
            it(`responds with 404`, () => {
                const TuePMId = 123456
                return supertest(app)
                    .delete(`/api/TuePM/${TuePMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `TuePM data does not exist` } })
            });
        });

        context('Given there is TuePM data in the database', () => {
            const testTuePM = makeTuePM()

            beforeEach('insert TuePM data', () => {
                return db
                    .into('tue_pm')
                    .insert(testTuePM)
            })

            it('responds with 204 and removes the TuePM data', () => {
                const idToRemove = 2
                const expectedTuePM = testTuePM.filter(TuePM => TuePM.tue_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/TuePM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/TuePM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedTuePM)
                    );
            });
        });
    });

    describe(`DELETE /api/WedPM/:wed_pm_id`, () => {
        context(`Given no WedPM Data`, () => {
            it(`responds with 404`, () => {
                const WedPMId = 123456
                return supertest(app)
                    .delete(`/api/WedPM/${WedPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `WedPM data does not exist` } })
            });
        });

        context('Given there is WedPM data in the database', () => {
            const testWedPM = makeWedPM()

            beforeEach('insert WedPM data', () => {
                return db
                    .into('wed_pm')
                    .insert(testWedPM)
            })

            it('responds with 204 and removes the WedPM data', () => {
                const idToRemove = 2
                const expectedWedPM = testWedPM.filter(WedPM => WedPM.wed_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/WedPM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/WedPM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedWedPM)
                    );
            });
        });
    });

    describe(`DELETE /api/ThuPM/:thu_pm_id`, () => {
        context(`Given no ThuPM Data`, () => {
            it(`responds with 404`, () => {
                const ThuPMId = 123456
                return supertest(app)
                    .delete(`/api/ThuPM/${ThuPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `ThuPM data does not exist` } })
            });
        });

        context('Given there is ThuPM data in the database', () => {
            const testThuPM = makeThuPM()

            beforeEach('insert ThuPM data', () => {
                return db
                    .into('sun_pm')
                    .insert(testThuPM)
            })

            it('responds with 204 and removes the ThuPM data', () => {
                const idToRemove = 2
                const expectedThuPM = testThuPM.filter(ThuPM => ThuPM.thu_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/ThuPM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/ThuPM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedThuPM)
                    );
            });
        });
    });

    describe(`DELETE /api/FriPM/:fri_pm_id`, () => {
        context(`Given no FriPM Data`, () => {
            it(`responds with 404`, () => {
                const FriPMId = 123456
                return supertest(app)
                    .delete(`/api/FriPM/${FriPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `FriPM data does not exist` } })
            });
        });

        context('Given there is FriPM data in the database', () => {
            const testFriPM = makeFriPM()

            beforeEach('insert FriPM data', () => {
                return db
                    .into('fri_pm')
                    .insert(testFriPM)
            })

            it('responds with 204 and removes the FriPM data', () => {
                const idToRemove = 2
                const expectedFriPM = testFriPM.filter(FriPM => FriPM.fri_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/FriPM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/FriPM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedFriPM)
                    );
            });
        });
    });

    describe(`DELETE /api/SatPM/:sat_pm_id`, () => {
        context(`Given no SatPM Data`, () => {
            it(`responds with 404`, () => {
                const SatPMId = 123456
                return supertest(app)
                    .delete(`/api/SatPM/${SatPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `SatPM data does not exist` } })
            });
        });

        context('Given there is SatPM data in the database', () => {
            const testSatPM = makeSatPM()

            beforeEach('insert SatPM data', () => {
                return db
                    .into('sat_pm')
                    .insert(testSatPM)
            })

            it('responds with 204 and removes the SatPM data', () => {
                const idToRemove = 2
                const expectedSatPM = testSatPM.filter(SatPM => SatPM.sat_pm_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/SatPM/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/SatPM`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedSatPM)
                    );
            });
        });
    });

    /*PATCH PM days tests*/
    describe(`PATCH /api/SunPM/:sun_pm_id`, () => {
        context(`Given no SunPM data`, () => {
            it(`responds with 404`, () => {
                const SunPMId = 123456;
                return supertest(app)
                    .patch(`/api/SunPM/${SunPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `SunPM data does not exist` } })
            });
        });

        context('Given there is SunPM data in the database', () => {
            const testSunPM = makeSunPM();
            const updateSunPM = {
                sun_pm12: 3,
                sun_pm1230: 3,
                sun_pm1: 3,
                sun_pm130: 3,
                sun_pm2: 3,
                sun_pm230: 3,
                sun_pm3: 3,
                sun_pm330: 3,
                sun_pm4: 3,
                sun_pm430: 3,
                sun_pm5: 3,
                sun_pm530: 3,
                sun_pm6: 3,
                sun_pm630: 3,
                sun_pm7: 3,
                sun_pm730: 3,
                sun_pm8: 3,
                sun_pm830: 3,
                sun_pm9: 3,
                sun_pm930: 3,
                sun_pm10: 3,
                sun_pm1030: 3,
                sun_pm11: 3,
                sun_pm1130: 3
            }

            beforeEach('insert SunPM data', () => {
                return db
                    .into('sun_pm')
                    .insert(testSunPM)
            })

            it('responds with 204 and updates the SunPM data', () => {
                const idToUpdate = 2
                const expectedSunPM = {
                    ...testSunPM[idToUpdate - 1],
                    ...updateSunPM
                }
                return supertest(app)
                    .patch(`/api/SunPM/${idToUpdate}`)
                    .send(updateSunPM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/SunPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedSunPM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/SunPM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'sun_pm12', 'sun_pm1230', 'sun_pm1', 'sun_pm130', 'sun_pm2', 'sun_pm230', 'sun_pm3', 'sun_pm330', 'sun_pm4', 'sun_pm430', 'sun_pm5', 'sun_pm530', 'sun_pm6', 'sun_pm630', 'sun_pm7', 'sun_pm730', 'sun_pm8', 'sun_pm830', 'sun_pm9', 'sun_pm930', 'sun_pm10', 'sun_pm1030', 'sun_pm11', 'sun_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedSunPM = {
                    ...testSunPM[idToUpdate - 1],
                    ...updateSunPM
                }

                return supertest(app)
                    .patch(`/api/SunPM/${idToUpdate}`)
                    .send({
                        ...updateSunPM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/SunPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedSunPM)
                    );
            });
        });
    });

    describe(`PATCH /api/MonPM/:mon_pm_id`, () => {
        context(`Given no MonPM data`, () => {
            it(`responds with 404`, () => {
                const MonPMId = 123456;
                return supertest(app)
                    .patch(`/api/MonPM/${MonPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `MonPM data does not exist` } })
            });
        });

        context('Given there is MonPM data in the database', () => {
            const testMonPM = makeMonPM();
            const updateMonPM = {
                mon_pm12: 3,
                mon_pm1230: 3,
                mon_pm1: 3,
                mon_pm130: 3,
                mon_pm2: 3,
                mon_pm230: 3,
                mon_pm3: 3,
                mon_pm330: 3,
                mon_pm4: 3,
                mon_pm430: 3,
                mon_pm5: 3,
                mon_pm530: 3,
                mon_pm6: 3,
                mon_pm630: 3,
                mon_pm7: 3,
                mon_pm730: 3,
                mon_pm8: 3,
                mon_pm830: 3,
                mon_pm9: 3,
                mon_pm930: 3,
                mon_pm10: 3,
                mon_pm1030: 3,
                mon_pm11: 3,
                mon_pm1130: 3
            }

            beforeEach('insert MonPM data', () => {
                return db
                    .into('mon_pm')
                    .insert(testMonPM)
            })

            it('responds with 204 and updates the MonPM data', () => {
                const idToUpdate = 2
                const expectedMonPM = {
                    ...testMonPM[idToUpdate - 1],
                    ...updateMonPM
                }
                return supertest(app)
                    .patch(`/api/MonPM/${idToUpdate}`)
                    .send(updateMonPM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/MonPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedMonPM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/MonPM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'mon_pm12', 'mon_pm1230', 'mon_pm1', 'mon_pm130', 'mon_pm2', 'mon_pm230', 'mon_pm3', 'mon_pm330', 'mon_pm4', 'mon_pm430', 'mon_pm5', 'mon_pm530', 'mon_pm6', 'mon_pm630', 'mon_pm7', 'mon_pm730', 'mon_pm8', 'mon_pm830', 'mon_pm9', 'mon_pm930', 'mon_pm10', 'mon_pm1030', 'mon_pm11', 'mon_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedMonPM = {
                    ...testMonPM[idToUpdate - 1],
                    ...updateMonPM
                }

                return supertest(app)
                    .patch(`/api/MonPM/${idToUpdate}`)
                    .send({
                        ...updateMonPM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/MonPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedMonPM)
                    );
            });
        });
    });

    describe(`PATCH /api/TuePM/:tue_pm_id`, () => {
        context(`Given no TuePM data`, () => {
            it(`responds with 404`, () => {
                const TuePMId = 123456;
                return supertest(app)
                    .patch(`/api/TuePM/${TuePMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `TuePM data does not exist` } })
            });
        });

        context('Given there is TuePM data in the database', () => {
            const testTuePM = makeTuePM();
            const updateTuePM = {
                tue_pm12: 3,
                tue_pm1230: 3,
                tue_pm1: 3,
                tue_pm130: 3,
                tue_pm2: 3,
                tue_pm230: 3,
                tue_pm3: 3,
                tue_pm330: 3,
                tue_pm4: 3,
                tue_pm430: 3,
                tue_pm5: 3,
                tue_pm530: 3,
                tue_pm6: 3,
                tue_pm630: 3,
                tue_pm7: 3,
                tue_pm730: 3,
                tue_pm8: 3,
                tue_pm830: 3,
                tue_pm9: 3,
                tue_pm930: 3,
                tue_pm10: 3,
                tue_pm1030: 3,
                tue_pm11: 3,
                tue_pm1130: 3
            }

            beforeEach('insert TuePM data', () => {
                return db
                    .into('tue_pm')
                    .insert(testTuePM)
            })

            it('responds with 204 and updates the TuePM data', () => {
                const idToUpdate = 2
                const expectedTuePM = {
                    ...testTuePM[idToUpdate - 1],
                    ...updateTuePM
                }
                return supertest(app)
                    .patch(`/api/TuePM/${idToUpdate}`)
                    .send(updateTuePM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/TuePM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedTuePM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/TuePM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'tue_pm12', 'tue_pm1230', 'tue_pm1', 'tue_pm130', 'tue_pm2', 'tue_pm230', 'tue_pm3', 'tue_pm330', 'tue_pm4', 'tue_pm430', 'tue_pm5', 'tue_pm530', 'tue_pm6', 'tue_pm630', 'tue_pm7', 'tue_pm730', 'tue_pm8', 'tue_pm830', 'tue_pm9', 'tue_pm930', 'tue_pm10', 'tue_pm1030', 'tue_pm11', 'tue_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedTuePM = {
                    ...testTuePM[idToUpdate - 1],
                    ...updateTuePM
                }

                return supertest(app)
                    .patch(`/api/TuePM/${idToUpdate}`)
                    .send({
                        ...updateTuePM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/TuePM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedTuePM)
                    );
            });
        });
    });

    describe(`PATCH /api/WedPM/:wed_pm_id`, () => {
        context(`Given no WedPM data`, () => {
            it(`responds with 404`, () => {
                const WedPMId = 123456;
                return supertest(app)
                    .patch(`/api/WedPM/${WedPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `WedPM data does not exist` } })
            });
        });

        context('Given there is WedPM data in the database', () => {
            const testWedPM = makeWedPM();
            const updateWedPM = {
                wed_pm12: 3,
                wed_pm1230: 3,
                wed_pm1: 3,
                wed_pm130: 3,
                wed_pm2: 3,
                wed_pm230: 3,
                wed_pm3: 3,
                wed_pm330: 3,
                wed_pm4: 3,
                wed_pm430: 3,
                wed_pm5: 3,
                wed_pm530: 3,
                wed_pm6: 3,
                wed_pm630: 3,
                wed_pm7: 3,
                wed_pm730: 3,
                wed_pm8: 3,
                wed_pm830: 3,
                wed_pm9: 3,
                wed_pm930: 3,
                wed_pm10: 3,
                wed_pm1030: 3,
                wed_pm11: 3,
                wed_pm1130: 3
            }

            beforeEach('insert WedPM data', () => {
                return db
                    .into('wed_pm')
                    .insert(testWedPM)
            })

            it('responds with 204 and updates the WedPM data', () => {
                const idToUpdate = 2
                const expectedWedPM = {
                    ...testWedPM[idToUpdate - 1],
                    ...updateWedPM
                }
                return supertest(app)
                    .patch(`/api/WedPM/${idToUpdate}`)
                    .send(updateWedPM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/WedPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedWedPM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/WedPM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'wed_pm12', 'wed_pm1230', 'wed_pm1', 'wed_pm130', 'wed_pm2', 'wed_pm230', 'wed_pm3', 'wed_pm330', 'wed_pm4', 'wed_pm430', 'wed_pm5', 'wed_pm530', 'wed_pm6', 'wed_pm630', 'wed_pm7', 'wed_pm730', 'wed_pm8', 'wed_pm830', 'wed_pm9', 'wed_pm930', 'wed_pm10', 'wed_pm1030', 'wed_pm11', 'wed_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedWedPM = {
                    ...testWedPM[idToUpdate - 1],
                    ...updateWedPM
                }

                return supertest(app)
                    .patch(`/api/WedPM/${idToUpdate}`)
                    .send({
                        ...updateWedPM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/WedPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedWedPM)
                    );
            });
        });
    });

    describe(`PATCH /api/ThuPM/:thu_pm_id`, () => {
        context(`Given no ThuPM data`, () => {
            it(`responds with 404`, () => {
                const ThuPMId = 123456;
                return supertest(app)
                    .patch(`/api/ThuPM/${ThuPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `ThuPM data does not exist` } })
            });
        });

        context('Given there is ThuPM data in the database', () => {
            const testThuPM = makeThuPM();
            const updateThuPM = {
                thu_pm12: 3,
                thu_pm1230: 3,
                thu_pm1: 3,
                thu_pm130: 3,
                thu_pm2: 3,
                thu_pm230: 3,
                thu_pm3: 3,
                thu_pm330: 3,
                thu_pm4: 3,
                thu_pm430: 3,
                thu_pm5: 3,
                thu_pm530: 3,
                thu_pm6: 3,
                thu_pm630: 3,
                thu_pm7: 3,
                thu_pm730: 3,
                thu_pm8: 3,
                thu_pm830: 3,
                thu_pm9: 3,
                thu_pm930: 3,
                thu_pm10: 3,
                thu_pm1030: 3,
                thu_pm11: 3,
                thu_pm1130: 3
            }

            beforeEach('insert ThuPM data', () => {
                return db
                    .into('thu_pm')
                    .insert(testThuPM)
            })

            it('responds with 204 and updates the ThuPM data', () => {
                const idToUpdate = 2
                const expectedThuPM = {
                    ...testThuPM[idToUpdate - 1],
                    ...updateThuPM
                }
                return supertest(app)
                    .patch(`/api/ThuPM/${idToUpdate}`)
                    .send(updateThuPM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/ThuPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedThuPM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/ThuPM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'thu_pm12', 'thu_pm1230', 'thu_pm1', 'thu_pm130', 'thu_pm2', 'thu_pm230', 'thu_pm3', 'thu_pm330', 'thu_pm4', 'thu_pm430', 'thu_pm5', 'thu_pm530', 'thu_pm6', 'thu_pm630', 'thu_pm7', 'thu_pm730', 'thu_pm8', 'thu_pm830', 'thu_pm9', 'thu_pm930', 'thu_pm10', 'thu_pm1030', 'thu_pm11', 'thu_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedThuPM = {
                    ...testThuPM[idToUpdate - 1],
                    ...updateThuPM
                }

                return supertest(app)
                    .patch(`/api/ThuPM/${idToUpdate}`)
                    .send({
                        ...updateThuPM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/ThuPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedThuPM)
                    );
            });
        });
    });

    describe(`PATCH /api/FriPM/:fri_pm_id`, () => {
        context(`Given no FriPM data`, () => {
            it(`responds with 404`, () => {
                const FriPMId = 123456;
                return supertest(app)
                    .patch(`/api/FriPM/${FriPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `FriPM data does not exist` } })
            });
        });

        context('Given there is FriPM data in the database', () => {
            const testFriPM = makeFriPM();
            const updateFriPM = {
                fri_pm12: 3,
                fri_pm1230: 3,
                fri_pm1: 3,
                fri_pm130: 3,
                fri_pm2: 3,
                fri_pm230: 3,
                fri_pm3: 3,
                fri_pm330: 3,
                fri_pm4: 3,
                fri_pm430: 3,
                fri_pm5: 3,
                fri_pm530: 3,
                fri_pm6: 3,
                fri_pm630: 3,
                fri_pm7: 3,
                fri_pm730: 3,
                fri_pm8: 3,
                fri_pm830: 3,
                fri_pm9: 3,
                fri_pm930: 3,
                fri_pm10: 3,
                fri_pm1030: 3,
                fri_pm11: 3,
                fri_pm1130: 3
            }

            beforeEach('insert FriPM data', () => {
                return db
                    .into('fri_pm')
                    .insert(testFriPM)
            })

            it('responds with 204 and updates the FriPM data', () => {
                const idToUpdate = 2
                const expectedFriPM = {
                    ...testFriPM[idToUpdate - 1],
                    ...updateFriPM
                }
                return supertest(app)
                    .patch(`/api/FriPM/${idToUpdate}`)
                    .send(updateFriPM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/FriPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedFriPM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/FriPM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'fri_pm12', 'fri_pm1230', 'fri_pm1', 'fri_pm130', 'fri_pm2', 'fri_pm230', 'fri_pm3', 'fri_pm330', 'fri_pm4', 'fri_pm430', 'fri_pm5', 'fri_pm530', 'fri_pm6', 'fri_pm630', 'fri_pm7', 'fri_pm730', 'fri_pm8', 'fri_pm830', 'fri_pm9', 'fri_pm930', 'fri_pm10', 'fri_pm1030', 'fri_pm11', 'fri_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedFriPM = {
                    ...testFriPM[idToUpdate - 1],
                    ...updateFriPM
                }

                return supertest(app)
                    .patch(`/api/FriPM/${idToUpdate}`)
                    .send({
                        ...updateFriPM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/FriPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedFriPM)
                    );
            });
        });
    });

    describe(`PATCH /api/SatPM/:sat_pm_id`, () => {
        context(`Given no SatPM data`, () => {
            it(`responds with 404`, () => {
                const SatPMId = 123456;
                return supertest(app)
                    .patch(`/api/SatPM/${SatPMId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `SatPM data does not exist` } })
            });
        });

        context('Given there is SatPM data in the database', () => {
            const testSatPM = makeSatPM();
            const updateSatPM = {
                sat_pm12: 3,
                sat_pm1230: 3,
                sat_pm1: 3,
                sat_pm130: 3,
                sat_pm2: 3,
                sat_pm230: 3,
                sat_pm3: 3,
                sat_pm330: 3,
                sat_pm4: 3,
                sat_pm430: 3,
                sat_pm5: 3,
                sat_pm530: 3,
                sat_pm6: 3,
                sat_pm630: 3,
                sat_pm7: 3,
                sat_pm730: 3,
                sat_pm8: 3,
                sat_pm830: 3,
                sat_pm9: 3,
                sat_pm930: 3,
                sat_pm10: 3,
                sat_pm1030: 3,
                sat_pm11: 3,
                sat_pm1130: 3
            }

            beforeEach('insert SatPM data', () => {
                return db
                    .into('sat_pm')
                    .insert(testSatPM)
            })

            it('responds with 204 and updates the SatPM data', () => {
                const idToUpdate = 2
                const expectedSatPM = {
                    ...testSatPM[idToUpdate - 1],
                    ...updateSatPM
                }
                return supertest(app)
                    .patch(`/api/SatPM/${idToUpdate}`)
                    .send(updateSatPM)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/SatPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedSatPM)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/SatPM/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain 'sat_pm12', 'sat_pm1230', 'sat_pm1', 'sat_pm130', 'sat_pm2', 'sat_pm230', 'sat_pm3', 'sat_pm330', 'sat_pm4', 'sat_pm430', 'sat_pm5', 'sat_pm530', 'sat_pm6', 'sat_pm630', 'sat_pm7', 'sat_pm730', 'sat_pm8', 'sat_pm830', 'sat_pm9', 'sat_pm930', 'sat_pm10', 'sat_pm1030', 'sat_pm11', 'sat_pm1130'`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;

                const expectedSatPM = {
                    ...testSatPM[idToUpdate - 1],
                    ...updateSatPM
                }

                return supertest(app)
                    .patch(`/api/SatPM/${idToUpdate}`)
                    .send({
                        ...updateSatPM,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/SatPM/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedSatPM)
                    );
            });
        });
    });
});