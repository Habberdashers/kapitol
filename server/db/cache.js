'use strict';

const path = require('path');
const jsonFile = require('jsonfile');
const _ = require('underscore');


module.exports = {
    _senateFilePath: path.join(__dirname, '../files/senate-members-clean.json'),

    _houseFilePath: path.join(__dirname, '../files/house-members-clean.json'),

    _members: null,

    getMembers: function() {
        if (this._members) {
            return this._members;
        }

        let senateMembers = jsonFile.readFileSync(this._senateFilePath);
        let houseMembers = jsonFile.readFileSync(this._houseFilePath);
        this._members = senateMembers.concat(houseMembers);
        return this._members;
    },

    filterMembersByName: function(name, callback) {
        let names = name.split('+');
        names = _.without(names, ' ');
        const members = this.getMembers();
        let filteredMembers = [];
        _.each(members, function(member) {
            if (names.length === 0) {
                filteredMembers.push(member);
            } else if (names.length === 1 && member.firstName.toLowerCase().includes(names[0].toLowerCase())) {
                filteredMembers.push(member);
            } else if (
                member.firstName.toLowerCase().includes(names[0].toLowerCase()) &&
                member.lastName.toLowerCase().includes(names[names.length - 1].toLowerCase())
            ) {
                filteredMembers.push(member);
            }
        });
        callback(filteredMembers);
    }
};
