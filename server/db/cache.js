'use strict';

const path = require('path');
const jsonFile = require('jsonfile');
const _ = require('underscore');


module.exports = {
    _filePath: path.join(__dirname, '../files/members.json'),

    _members: null,

    getMembers: function() {
        if (this._members) {
            return this._members;
        }

        this._members = jsonFile.readFileSync(this._filePath);
        return this._members;
    },

    filterMembersByName: function(name, callback) {
        let names = name.split(' ');
        names = _.without(names, ' ');
        const members = this.getMembers();
        let filteredMembers = [];
        _.each(members, function(member) {
            if (names.length === 0) {
                filteredMembers.push(member);
            } else if (names.length === 1 && member.firstName.includes(names[0])) {
                filteredMembers.push(member);
            } else if (
                member.firstName.includes(names[0]) &&
                member.lastName.includes[names[names.length - 1]]
            ) {
                filteredMembers.push(member);
            }
        });

        callback(filteredMembers);
    }
};
