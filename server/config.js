'use strict';

module.exports = {
    paths: {
        logPath: !!process.env.KAPITOL_LOG_PATH ? process.env.KAPITOL_LOG_PATH : null
    }
};
