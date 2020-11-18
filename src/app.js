require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { NODE_ENV } = require('./config')
//const validateBearerToken = require('./validate-token');
const errorHandler = require('./error-handler');
const contactsRouter = require('./contacts/contacts-router');

/*routers*/
const timezoneRouter = require('./timezone/timezone-router');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', { skip: () => NODE_ENV === 'test' }))
app.use(helmet());
app.use(cors());
//app.use(validateBearerToken);

app.get('/api', (req, res) => {
    res.send('Hello, world! Welcome to Availy!')
})

//app.use('/api/timezones', timezoneRouter);
app.use('/api/contacts', contactsRouter);

app.use(errorHandler);

module.exports = app;