'use strict';

const request = require('request');
const logger = require('./../utils/logger');
const _ = require('underscore');


module.exports = {
    makeRequest: function(url, callback) {
        request(url, (error, response, body) => {
            if (error) {
                logger('Error making request to', url, 'Error:', error);
                return callback(error, null);
            }

            callback(null, JSON.parse(body));
        });
    }
};
