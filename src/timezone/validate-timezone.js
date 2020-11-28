const logger = require('../logger');

//check timezone request is valid
function getTimezoneValidationError({ timezone }) {
    //check zone name is uppercase and less than 7 characters but more than 3
    if (timezone.zonename == (timezone.zonename).toUpperCase()) {
        if ((timezone.zonename) > 7 || (timezone.zonename) < 3) {
            logger.error(`Invalid timezone name given`);
            return { error: { message: `Timezone name must be less than 7 or 3 or more characters .` } };
        }
    } else {
        logger.error(`Invalid timezone name given`);
        return { error: { message: `Timezone name must be uppercase.` } };
    }

    //check if zoneoffset has format + or - NN:NN
    let offsetRegex = /[+-][0-2]\d:[0-5]\d/;
    if (!(timezone.zoneoffset).test(offsetRegex)) {
        logger.error(`Invalid timezone offset given`);
        return { error: { message: `Timezone offset must in the example format +00:00.  It must contain + or -, numbers between 00 to 24, a colon :, and numbers between 00 and 59` } };
    }

    //check zone description is not null and contains more than 5 characters and less than 75 characters
    if ((timezone.zonedesc).length < 5 || (timezone.zonedesc).length > 75) {
        logger.error(`Invalid timezone description given`);
        return { error: { message: `Timezone Description must be more than 5 and less than 75 characters.` } };
    }
}

module.exports = { getTimezoneValidationError };