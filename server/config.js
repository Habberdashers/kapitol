'use strict';

const _ = require('underscore');


const requiredParams = [
    'KAPITOL_MONGO_URL',
    'KAPITOL_APP_PORT',
    'KAPITOL_APP_HOST'
];

for (let i=0; i < requiredParams.length; i++) {
    if (!_.has(process.env, requiredParams[i])) {
        console.log(
            'Error: environment variables have not been properly setup.',
            'The variable:',
            requiredParams[i],
            'was not found.'
        );

        throw new Error('Environment Variables Not Properly Set');
    }
}

module.exports = {
    app: {
        port: process.env.KAPITOL_APP_PORT,
        host: process.env.KAPITOL_APP_HOST
    },

    paths: {
        logPath: process.env.KAPITOL_LOG_PATH || null
    },

    mongo: {
        databaseUrl: process.env.KAPITOL_MONGO_URL
    }
};
