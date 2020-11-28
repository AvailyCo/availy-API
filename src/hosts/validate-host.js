const logger = require('../logger');

//check host request body contains only integers
function getHostValidationError({ host }) {
    if (!host.isInteger) {
        logger.error(`Invalid request given for host`);
        return {
            error: {
                message: `Host request must contain integers.`
            }
        };
    }
}

module.exports = { getHostValidationError };
