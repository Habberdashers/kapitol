'use strict';

const path = require('path');
const jsonFile = require('jsonfile');
const _ = require('underscore');


module.exports = {
    _senateFilePath: path.join(__dirname, '../files/senate-members-clean.json'),

    _houseFilePath: path.join(__dirname, '../files/house-members-clean.json'),

    _members: null,

    _liberalWeights: {
        'against': .2,
        'favor:': .8,
        'for': .7,
    },

    _issues: {
        climateChange: jsonFile.readFileSync(path.join(__dirname, '../files/climate-change.json')),
        gayMarriage: jsonFile.readFileSync(path.join(__dirname, '../files/gay-marriage.json')),
        gunController: jsonFile.readFileSync(path.join(__dirname, '../files/gun-control.json')),
        healthCare: jsonFile.readFileSync(path.join(__dirname, '../files/health-care.json')),
        abortion: jsonFile.readFileSync(path.join(__dirname, '../files/abortion.json'))
    },

    issueRanking: {
        climateChange: 0.7,
        gayMarriage: 0.6,
        gunController: 0.3,
        healthCare: 0.4,
        abortion: 0.4
    },

    getMembers: function() {
        if (this._members) {
            return this._members;
        }

        let senateMembers = jsonFile.readFileSync(this._senateFilePath);
        let houseMembers = jsonFile.readFileSync(this._houseFilePath);
        this._members = senateMembers.concat(houseMembers);
        return this._members;
    },

    filterMembersByName(name, callback) {
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
    },

    scaleValue: function() {
        return Math.random()/5.0
    },

    runAnalytics: function(party) {
        const climateScore = this.scoreForText(this._issues.climateChange, party);
        const gayMarriage = this.scoreForText(this._issues.gayMarriage, party);
        const gunController = this.scoreForText(this._issues.gunController, party);
        const healthCare = this.scoreForText(this._issues.healthCare, party);
        const abortion = this.scoreForText(this._issues.abortion, party);
        party = party.toLowerCase();
        return [{
            'climate score': climateScore
        }, {
            'gay marriage': gayMarriage
        }, {
            'gun control': gunController
        }, {
            'health care': healthCare
        }, {
            'abortion': abortion
        }];
    },

    scoreForText: function(text, party) {
        let numberOfHits = 0;
        let score = 0.0;
        const words = text.split(' ');
        _.each(words, function(word) {
            const lowercaseWord = word.toLowerCase();
             if (_.has(this._liberalWeights, lowercaseWord)) {
                 score += this._liberalWeights[lowercaseWord];
                 numberOfHits += 1;
             }
        }, this);

        let total = score/numberOfHits;
        if (party === 'r') {
            total -= this.scaleValue();
        }

        if (total < 0) {
            total = Math.random() / 10.0;
        }

        return total;
    }
};
