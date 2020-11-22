const logger = require('../logger');

//validate the values returned as a response from client
function getDayValidationError({ day }) {

    //check value is an Integer
    day.forEach(entry => {
        if (!entry.isInteger()) {
            logger.error(`Invalid day value given`);
            return {
                error: { message: `Value for hour must be a number.` }
            };
        }
    })
}

module.exports = { getDayValidationError };