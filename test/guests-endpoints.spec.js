const knex = require('knex')
const app = require('../src/app')

/************Add Fixtures****************/
//const { makeGuestsArray } = require('./guest-fixtures')

describe('Guests Endpoints', function () {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE guests, guests, events, groups, group_members, contacts, users, week, timezone, sat_PM, sat_AM, fri_PM, fri_AM, thu_PM, thu_AM, wed_PM, wed_AM, tue_PM, tue_AM, mon_PM, mon_AM, sun_PM, sun_AM RESTART IDENTITY CASCADE'))
    afterEach('cleanup', () => db.raw('TRUNCATE guests, guests, events, groups, group_members, contacts, users, week, timezone, sat_PM, sat_AM, fri_PM, fri_AM, thu_PM, thu_AM, wed_PM, wed_AM, tue_PM, tue_AM, mon_PM, mon_AM, sun_PM, sun_AM RESTART IDENTITY CASCADE'))

    describe(`Unauthorized requests`, () => {
        const testGuests = makeGuestsArray();

        beforeEach('insert guest', () => {
            return db.into('guests').insert(testGuests);
        });

        it(`responds with 401 Unauthorized for GET /api/guests`, () => {
            return supertest(app)
                .get('/api/guests')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/guests/:attending_id`, () => {
            const guest = testGuests[1];
            return supertest(app)
                .get(`/api/guests/${guest.attending_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/guests`, () => {
            return supertest(app)
                .post('/api/guests')
                .send({
                    event_id: 1,
                    user_id: 3,
                    attending: true
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for PATCH /api/guests/:attending_id`, () => {
            const guest = testGuests[1];
            return supertest(app)
                .patch(`/api/guests/${guest.attending_id}`)
                .send({
                    attending_id: attending_id,
                    event_id: 1,
                    user_id: 1,
                    attending: false
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/guests/:attending_id`, () => {
            const guest = testGuests[1];
            return supertest(app)
                .delete(`/api/guests/ ${guest.attending_id} `)
                .expect(401, { error: 'Unauthorized request' });
        });
    });

    describe(`GET /api/guests`, () => {
        context(`Given no guests`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/guests')
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(200, [])
            });
        });

        context('Given there are guests in the database', () => {
            const testGuests = makeGuestsArray();

            beforeEach('insert guests', () => {
                return db
                    .into('guests')
                    .insert(testGuests)
            })

            it('responds with 200 and all of the guests', () => {
                return supertest(app)
                    .get('/api/guests')
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(200, testGuests)
            });
        });
    });

    describe(`GET /api/guests/:attending_id`, () => {
        context(`Given no guest`, () => {
            it(`responds with 404`, () => {
                const guestId = 123456;
                return supertest(app)
                    .get(`/ api / guests / ${guestId} `)
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(404, { error: { message: `Guest does not exist` } });
            });
        });

        context('Given there are guests in the database', () => {
            const testGuests = makeGuestsArray();

            beforeEach('insert guest', () => {
                return db.into('guests').insert(testGuests);
            });

            it('responds with 200 and the specified guest', () => {
                const guestId = 2;
                const expectedGuest = testGuests[guestId - 1];
                return supertest(app)
                    .get(`/api/guests/${attending_id} `)
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(200, expectedGuest);
            });
        });
    });

    describe(`POST /api/guests`, () => {
        const testGuests = makeGuestsArray();

        beforeEach('insert guests', () => {
            return db
                .into('guests')
                .insert(testGuests)
        })

        it(`creates a guest, responding with 201 and the new guest`, () => {
            const newGuest = {
                event_id: 2,
                user_id: 5,
                attending: true
            }
            return supertest(app)
                .post('/api/guests')
                .send(newGuest)
                //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                .expect(201)
                .expect(res => {
                    expect(res.body.user_id).to.eql(newGuest.user_id)
                    expect(res.body.event_id).to.eql(newGuest.event_id)
                    expect(res.body).to.have.property('attending_id')
                    expect(res.headers.location).to.eql(`/api/guests/${res.body.attending_id} `)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/guests/${res.body.attending_id} `)
                        //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                        .expect(res.body)
                );
        });

        const requiredFields = ['event_id', 'user_id', 'attending']
        requiredFields.forEach(field => {
            const newGuest = {
                event_id: 2,
                user_id: 5,
                attending: true
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newGuest[field]

                return supertest(app)
                    .post('/api/guests')
                    .send(newGuest)
                    .expect(400, {
                        error: {
                            message: `Missing '${field}' in request body`
                        }
                    })
            })
        })
    });

    describe(`DELETE /api/guests/:attending_id`, () => {
        context(`Given no guests`, () => {
            it(`responds with 404`, () => {
                const guestId = 123456
                return supertest(app)
                    .delete(`/api/guests/${guestId} `)
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(404, { error: { message: `Guest does not exist` } })
            });
        });

        context('Given there are guests in the database', () => {
            const testGuests = makeGuestsArray()

            beforeEach('insert guests', () => {
                return db
                    .into('guests')
                    .insert(testGuests)
            })

            it('responds with 204 and removes the guest', () => {
                const idToRemove = 2
                const expectedGuests = testGuests.filter(guest => guest.attending_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/guests/${idToRemove} `)
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/guests`)
                            //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                            .expect(expectedGuests)
                    );
            });
        });
    });

    describe(`PATCH /api/guests/:attending_id`, () => {
        context(`Given no guests`, () => {
            it(`responds with 404`, () => {
                const guestId = 123456;
                return supertest(app)
                    .patch(`/api/guests/${guestId} `)
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(404, { error: { message: `Guest does not exist` } })
            });
        });

        context('Given there are guests in the database', () => {
            const testGuests = makeGuestsArray()

            beforeEach('insert guests', () => {
                return db
                    .into('guests')
                    .insert(testGuests)
            })

            it('responds with 204 and updates the guest', () => {
                const idToUpdate = 2
                const updateGuest = {
                    event_id: 1,
                    user_id: 1,
                    attending: false
                }
                const expectedGuest = {
                    ...testGuests[idToUpdate - 1],
                    ...updateGuest
                }
                return supertest(app)
                    .patch(`/api/guests/${idToUpdate} `)
                    .send(updateGuest)
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/guests/${idToUpdate} `)
                            //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                            .expect(expectedGuest)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/guests/${idToUpdate} `)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(400, {
                        error: {
                            message: `Request body must contain event_id, user_id, and attending`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;
                const updateGuest = {
                    event_id: 1,
                    user_id: 1,
                    attending: false
                }
                const expectedGuest = {
                    ...testGuests[idToUpdate - 1],
                    ...updateGuest
                }

                return supertest(app)
                    .patch(`/api/guests/${idToUpdate} `)
                    .send({
                        ...updateGuest,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/guests/${idToUpdate} `)
                            //.set('Authorization', `Bearer ${ process.env.API_TOKEN } `)
                            .expect(expectedGuest)
                    );
            });
        });
    });
});