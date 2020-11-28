require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler');
//const validateBearerToken = require('./validate-token');

/*routers*/
const timezoneRouter = require('./timezone/timezone-router');
const groupsRouter = require('./groups/groups-router');
const eventsRouter = require('./events/events-router');
const guestsRouter = require('./guests/guests-router');
const hostsRouter = require('./hosts/hosts-router');
const usersRouter = require('./users/users-router');
const weekRouter = require('./week/week-router');


const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', { skip: () => NODE_ENV === 'test' }))
app.use(helmet());
app.use(cors());
//app.use(validateBearerToken);

app.get('/api', (req, res) => {
    res.send('Hello, world! Welcome to Availy!')
})

app.use('/api/timezones', timezoneRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/events', eventsRouter);
// app.use('/api/guests', guestsRouter);
// app.use('/api/host', hostsRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/week', weekRouter);

app.use(errorHandler);

module.exports = app;