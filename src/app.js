require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { NODE_ENV } = require('./config')
const errorHandler = require('./error-handler');

//const validateBearerToken = require('./validate-token');

/*routers*/
const contactsRouter = require('./contacts/contacts-router');
const timezoneRouter = require('./timezone/timezone-router');
const groupsRouter = require('./groups/groups-router');
const eventsRouter = require('./events/events-router');
const guestsRouter = require('./guests/guests-router');
const hostsRouter = require('./hosts/hosts-router');
const usersRouter = require('./users/users-router');
const weekRouter = require('./week/week-router');

/* const SunPMRouter = require('./days/sunpm/sun-pm-router');
const MonPMRouter = require('./days/monpm/mon-pm-router');
const TuePMRouter = require('./days/tuepm/tue-pm-router');
const WedPMRouter = require('./days/wedpm/wed-pm-router');
const ThuPMRouter = require('./days/thupm/thu-pm-router');
const FriPMRouter = require('./days/fripm/fri-pm-router');
const SatPMRouter = require('./days/satpm/sat-pm-router'); */


const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', { skip: () => NODE_ENV === 'test' }))
app.use(helmet());
app.use(cors());
//app.use(validateBearerToken);

app.get('/api', (req, res) => {
    res.send('Hello, world! Welcome to Availy API!')
})

app.use('/api/contacts', contactsRouter);
app.use('/api/timezones', timezoneRouter);
app.use('/api/groups', groupsRouter);
// app.use('/api/events', eventsRouter); <= do this next
app.use('/api/guests', guestsRouter);
app.use('/api/hosts', hostsRouter);
// app.use('/api/users', usersRouter);
app.use('/api/weeks', weekRouter);

app.use('/api/SunPM', SunPMRouter);
app.use('/api/MonPM', MonPMRouter);
app.use('/api/TuePM', TuePMRouter);
app.use('/api/WedPM', WedPMRouter);
app.use('/api/ThuPM', ThuPMRouter);
app.use('/api/FriPM', FriPMRouter);
app.use('/api/SatPM', SatPMRouter);

app.use(errorHandler);

module.exports = app;