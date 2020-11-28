const logger = require('../logger');

//check host request body contains only integers
function getHostValidationError(host) {
    for (const key in host) {
        console.log(host[key]);
        if (!Number.isInteger((host[key]))) {
            logger.error(`Invalid request given for host`);
            return { error: { message: `Host request must contain integers.` } };
        }
    }
}

module.exports = { getHostValidationError };
