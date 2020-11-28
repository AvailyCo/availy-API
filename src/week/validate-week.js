const logger = require('../logger');

//validate the values entered by the user
function getWeekValidationError({ week }) {

    //check request is all integers except last one
    week.map(day => {

        if (day == "week_type") {
            if (day.length > 20 || day.length < 3) {
                logger.error(`Invalid week type given...`);
                return { error: { message: `Request week type must be less than 20 and more than 3 characters.` } };
            }

            //TODO?  Maybe add validation for week type specific

        } else {
            if (!day.isInteger) {
                logger.error(`Invalid request given...`);
                return { error: { message: `Request must contain an integer.` } };
            }
        }
    })
}

module.exports = { getWeekValidationError };