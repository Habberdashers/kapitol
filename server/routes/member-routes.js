'use strict';

const express = require('express');
const router = express.Router();
const jsonResponse = require('./../utils/json-response');
const cache = require('./../db/cache');
const logger = require('./../utils/logger');


router.get('/get-members/:searchTerm', function(req, res) {

    logger(req.params);
    cache.filterMembersByName(req.params.searchTerm, function(filteredMembers) {
        jsonResponse(res, 200, null, filteredMembers);
    });
});

module.exports = router;
