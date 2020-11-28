const logger = require('../logger');

//check title posted is greater than 3 characters and 
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
