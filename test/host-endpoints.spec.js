const knex = require('knex')
const app = require('../src/app')

/************Add Fixtures****************/
//const { makeFoldersArray, makeMaliciousFolder } = require('./host-fixtures')

describe('Host Endpoints', function () {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw('TRUNCATE guests, hosts, events, groups, group_members, contacts, users, week, timezone, sat_PM, sat_AM, fri_PM, fri_AM, thu_PM, thu_AM, wed_PM, wed_AM, tue_PM, tue_AM, mon_PM, mon_AM, sun_PM, sun_AM RESTART IDENTITY CASCADE'))
    afterEach('cleanup', () => db.raw('TRUNCATE guests, hosts, events, groups, group_members, contacts, users, week, timezone, sat_PM, sat_AM, fri_PM, fri_AM, thu_PM, thu_AM, wed_PM, wed_AM, tue_PM, tue_AM, mon_PM, mon_AM, sun_PM, sun_AM RESTART IDENTITY CASCADE'))

    describe(`Unauthorized requests`, () => {
        const testHosts = makeHostsArray();

        beforeEach('insert host', () => {
            return db.into('hosts').insert(testHosts);
        });

        it(`responds with 401 Unauthorized for GET /api/hosts`, () => {
            return supertest(app)
                .get('/api/hosts')
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for GET /api/hosts/:host_id`, () => {
            const host = testHosts[1];
            return supertest(app)
                .get(`/api/hosts/${host.host_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for POST /api/hosts`, () => {
            return supertest(app)
                .post('/api/hosts')
                .send({
                    user_id: 5,
                    event_id: 2,
                })
                .expect(401, { error: 'Unauthorized request' });
        });

        it(`responds with 401 Unauthorized for DELETE /api/hosts/:host_id`, () => {
            const host = testHosts[1];
            return supertest(app)
                .delete(`/api/hosts/${host.host_id}`)
                .expect(401, { error: 'Unauthorized request' });
        });
    });

    describe(`GET /api/hosts`, () => {
        context(`Given no hosts`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/hosts')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            });
        });

        context('Given there are hosts in the database', () => {
            const testHosts = makeHostsArray();

            beforeEach('insert hosts', () => {
                return db
                    .into('hosts')
                    .insert(testHosts)
            })

            it('responds with 200 and all of the hosts', () => {
                return supertest(app)
                    .get('/api/hosts')
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testHosts)
            });
        });
    });

    describe(`GET /api/hosts/:host_id`, () => {
        context(`Given no host`, () => {
            it(`responds with 404`, () => {
                const hostId = 123456;
                return supertest(app)
                    .get(`/api/hosts/${hostId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `Host does not exist` } });
            });
        });

        context('Given there are hosts in the database', () => {
            const testHosts = makeHostsArray();

            beforeEach('insert host', () => {
                return db.into('hosts').insert(testHosts);
            });

            it('responds with 200 and the specified host', () => {
                const hostId = 2;
                const expectedHost = testHosts[hostId - 1];
                return supertest(app)
                    .get(`/api/hosts/${host_id}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedHost);
            });
        });
    });

    describe(`POST /api/hosts`, () => {
        const testHosts = makeHostsArray();

        beforeEach('insert hosts', () => {
            return db
                .into('hosts')
                .insert(testHosts)
        })

        it(`creates a host, responding with 201 and the new host`, () => {
            const newHost = {
                user_id: 6,
                event_id: 2
            }
            return supertest(app)
                .post('/api/hosts')
                .send(newHost)
                //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.user_id).to.eql(newHost.user_id)
                    expect(res.body.event_id).to.eql(newHost.event_id)
                    expect(res.body).to.have.property('host_id')
                    expect(res.headers.location).to.eql(`/api/hosts/${res.body.host_id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/hosts/${res.body.host_id}`)
                        //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                );
        });

        const requiredFields = ['user_id', 'event_id']
        requiredFields.forEach(field => {
            const newHost = {
                user_id: 6,
                event_id: 2
            }

            it(`responds with 400 and an error message when the '${field}' is missing`, () => {
                delete newHost[field]

                return supertest(app)
                    .post('/api/hosts')
                    .send(newHost)
                    .expect(400, {
                        error: {
                            message: `Missing '${field}' in request body`
                        }
                    })
            })
        })
    });

    describe(`DELETE /api/hosts/:host_id`, () => {
        context(`Given no hosts`, () => {
            it(`responds with 404`, () => {
                const hostId = 123456
                return supertest(app)
                    .delete(`/api/hosts/${hostId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `Host does not exist` } })
            });
        });

        context('Given there are hosts in the database', () => {
            const testHosts = makeHostsArray()

            beforeEach('insert hosts', () => {
                return db
                    .into('hosts')
                    .insert(testHosts)
            })

            it('responds with 204 and removes the host', () => {
                const idToRemove = 2
                const expectedHosts = testHosts.filter(host => host.host_id !== idToRemove);
                return supertest(app)
                    .delete(`/api/hosts/${idToRemove}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/hosts`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedHosts)
                    );
            });
        });
    });

    describe(`PATCH /api/hosts/:host_id`, () => {
        context(`Given no hosts`, () => {
            it(`responds with 404`, () => {
                const hostId = 123456;
                return supertest(app)
                    .patch(`/api/hosts/${hostId}`)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, { error: { message: `Host does not exist` } })
            });
        });

        context('Given there are hosts in the database', () => {
            const testHosts = makeHostsArray()

            beforeEach('insert hosts', () => {
                return db
                    .into('hosts')
                    .insert(testHosts)
            })

            it('responds with 204 and updates the host', () => {
                const idToUpdate = 2
                const updateHost = {
                    user_id: 6,
                    event_id: 1
                }
                const expectedHost = {
                    ...testHosts[idToUpdate - 1],
                    ...updateHost
                }
                return supertest(app)
                    .patch(`/api/hosts/${idToUpdate}`)
                    .send(updateHost)
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/hosts/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedHost)
                    );
            });

            it(`responds with 400 when no required fields supplied`, () => {
                const idToUpdate = 2;
                return supertest(app)
                    .patch(`/api/hosts/${idToUpdate}`)
                    .send({ irrelevantField: 'foo' })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(400, {
                        error: {
                            message: `Request body must contain user_id or event_id`
                        }
                    });
            });

            it(`responds with 204 when updating only a subset of fields`, () => {
                const idToUpdate = 2;
                const updateHost = {
                    user_id: 6,
                    event_id: 1
                }
                const expectedHost = {
                    ...testHosts[idToUpdate - 1],
                    ...updateHost
                }

                return supertest(app)
                    .patch(`/api/hosts/${idToUpdate}`)
                    .send({
                        ...updateHost,
                        fieldToIgnore: 'should not be in GET response'
                    })
                    //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/hosts/${idToUpdate}`)
                            //.set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedHost)
                    );
            });
        });
    });
});
