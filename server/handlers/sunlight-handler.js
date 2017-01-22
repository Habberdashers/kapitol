'use strict';

const requestHandler = require('./request-handler');
const logger = require('./../utils/logger');
const _ = require('underscore');
const jsonFile = require('jsonfile');
const path = require('path');


class SunlightHandler {
    constructor(searchType, subPath, chamber, searchTerm, callback) {
        this._currentPage = 0;
        this._fetchSize = 50;
        this._baseUrl = 'https://congress.api.sunlightfoundation.com/';
        this._fetchedData = [];
        this._count = 0;
        this._callback = callback;
        this._subPath = subPath;
        this._chamber = chamber;
        this._isFirstRequest = true;
        this._searchType = searchType;
        this._searchTerm = searchTerm;
    };

    _constructMemberUrl() {
        return this._baseUrl + this._subPath + (!!this._chamber ? ('?chamber=' + this._chamber) : '') +
            '&per_page=' + this._fetchSize.toString() + '&page=' + this._currentPage.toString();
    };

    _constructBillUrl() {
        return this._baseUrl + 'bills/search?query="' + this._searchTerm + '"';
    }

    fetch() {
        const url = this._searchType == 'bill' ? this._constructBillUrl() : this._constructMemberUrl();
        logger('making request to url:', url);
        if (this._isFirstRequest) {
            this._isFirstRequest = false;
            requestHandler.makeRequest(url, this._handleResponse.bind(this));
        } else {
            if (this._count > this._currentPage * this._fetchSize) {
                requestHandler.makeRequest(url, this._handleResponse.bind(this));
            } else {
                jsonFile.writeFileSync(path.join(__dirname, '../files/abortion.json'), this._fetchedData);
                this._callback(null, this._fetchedData);
            }
        }
    };

    read() {
        const members = jsonFile.readFileSync(path.join(__dirname, '../files/house-members.json'));
        _.each(members, function(member) {
           logger('member', member, '\n');
        });
    }

    _handleResponse(error, data) {
        logger('handling response');
        if (error) {
            logger('Error making sunlight request at page:', this._currentPage, 'Error:', error);
            return this.fetch()
        }

        logger(data);
        logger('count:', data.count);
        this._count = data.count;
        this._currentPage += 1;
        this._fetchedData = this._fetchedData.concat(data.results);
        logger('fetched data has:', this._fetchedData.length, 'objects');
        this.fetch();
    };
}

module.exports = SunlightHandler;
