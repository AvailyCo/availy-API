const logger = require('../logger');

//check guest request body contains integers and boolean
function getGuestValidationError(guest) {
    if (!Number.isInteger(guest.event_id)) {
        logger.error(`Invalid event ID given`);
        return { error: { message: `'Event ID' must be an integer.` } };
    }

    if (!Number.isInteger(guest.user_id)) {
        logger.error(`Invalid user ID given`);
        return { error: { message: `'User ID' must be an integer.` } };
    }

    if (typeof guest.attending !== "boolean") {
        logger.error(`Invalid attending information given`);
        return { error: { message: `'Attending' must be a boolean.` } };
    }
}

module.exports = { getGuestValidationError };