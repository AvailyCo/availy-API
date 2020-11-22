const logger = require('../logger');

//validate the values returned as a response from client
function getDayValidationError(day) {

    //check value is an Integer
    for (let i = 0; i < day.length; i++) {
        if (!day[i].isInteger()) {
            logger.error(`Invalid day value given`);
            return {
                error: { message: `Value for hour must be a number.` }
            };
        }
    }
}

module.exports = { getDayValidationError };