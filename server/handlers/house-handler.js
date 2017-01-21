'use strict';

const _ = require('underscore');
const logger = require('./../utils/logger');
const jsonFile = require('jsonfile');
const path = require('path');


class HouseHandler {
    constructor() {
        this._rawMembers = jsonFile.readFileSync(path.join(__dirname, '../files/house-members.json'));
        this._members = [];
    };

    processData() {
        this._members = [];
        _.each(this._rawMembers, function(member) {
            this._members.push({
                bioguideId: member.bioguide_id,
                birthday: member.birthday,
                chamber: member.chamber,
                firstName: member.first_name,
                lastName: member.last_name,
                middleName: member.middle_name,
                district: member.district,
                party: member.party,
                state: member.state,
                phone: member.phone
            });
        }, this);

        jsonFile.writeFileSync(path.join(__dirname, '../files/house-members-clean.json'), this._members);
    };

    getParsedMembers() {
        return this._members;
    };
}

module.exports = HouseHandler;
