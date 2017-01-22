'use strict';

const requestHandler = require('./request-handler');
const logger = require('./../utils/logger');


class VoteHandler {
    constructor(memberId, keyword) {
        this._memberId = memberId;
        this._baseUrl = 'https://congress.api.sunlightfoundation.com/';
        this._keyword = keyword;
    };

    url() {
        //return this._baseUrl + 'votes?query=' + this._keyword;// + '?voter_ids.' + this._memberId + '__exists=true';
        //return this._baseUrl + 'votes?query=' + this._keyword;
            //+ 'voter_ids.' + this._memberId + '__exists=true';
    };

    fetchVotes(callback) {
        const url = this.url();
        logger('url:', url);
        requestHandler.makeRequest(url, function(error, data) {
            if (error) return logger(error);

            logger(data);
            callback(null, data);
        });
    };
}

module.exports = VoteHandler;
