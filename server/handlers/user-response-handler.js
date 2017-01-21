'use strict';

const _ = require('underscore');
const logger = require('./../utils/logger');


class UserResponseHandler {
    constructor(members) {
        this._rawMemebers = members;
        this._members = [];
    };

    processData() {
        this._members = [];
        _.each(this._rawMemebers, function(member) {
            this._members.push({
                birthday: member.person.birthday,
                firstName: member.person.firstname,
                lastName: member.person.lastname,
                middleName: member.person.middlename,
                district: member.person_role.district,
                party: member.person_role.party,
                state: member.person_role.state
            });
        }, this);
    };

    processFromFile() {
        this.members
    }

    getParsedMembers() {
        return this._members;
    };
}

module.exports = UserResponseHandler;
