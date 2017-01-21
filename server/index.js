'use strict';

const config = require('./config');
const logger = require('./utils/logger');


if (process.argv.length > 2 && process.argv[process.argv.length - 1] === 'members') {
    const _ = require('underscore');
    const requestHandler = require('./handlers/request-handler');
    const jsonFile = require('jsonfile');
    const path = require('path');

    requestHandler.makeRequest(
        'https://congress.api.sunlightfoundation.com/bills',
        (error, data) => {
            if (error) {
                return logger(error);
            }

            logger('count:', data.count);

            _.each(data.results, function(datum) {
                logger(datum, '\n');
            });
        }
    );
} else if (process.argv.length > 2 && process.argv[process.argv.length - 1] === 'sun') {
    const _ = require('underscore');
    const SunlightHandler = require('./handlers/sunlight-handler');

    const sunlightHandler = new SunlightHandler('bill', 'legislators', 'house', 'climate', function(error, data) {
        if (error) return logger(error);

        logger('got data with count:', data);
    });

    sunlightHandler.fetch();
} else if (process.argv.length > 2 && process.argv[process.argv.length - 1] === 'house') {
    const _ = require('underscore');
    const HouseHandler = require('./handlers/house-handler');

    const houseHandler = new HouseHandler();
    houseHandler.processData();
    logger(houseHandler.getParsedMembers());
} else if (process.argv.length > 2 && process.argv[process.argv.length - 1] === 'senate') {
    const _ = require('underscore');
    const SenateHandler = require('./handlers/senate-handler');

    const senateHandler = new SenateHandler();
    senateHandler.processData();
    logger(senateHandler.getParsedMembers());
} else {
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();
    const memberRoutes = require('./routes/member-routes');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static(process.env.CLIENT_PATH));
    app.use('/api/members', memberRoutes);


    const barData = [
        {
            label: "Monday",
            value: 100
        },
        {   
            label: "Tuesday",
            value: 89
        }, 
        {
            label: "Wednesday", 
            value: 23
        }, 
        {
            label: "Thursday", 
            value: 18
        }, 
        {   
            label: "Friday", 
            value: 78
        }, 
        {
            label: "Saturday", 
            value: 56
        }, 
        {
            label: "Sunday", 
            value: 30
        }
    ]

     const lineData = [
        {
            label: "Red",
            value: 10
        },
        {   
            label: "Orange",
            value: 84
        }, 
        {
            label: "Yellow", 
            value: 23
        }, 
        {
            label: "Green", 
            value: 34
        }, 
        {   
            label: "Blue", 
            value: 78
        }, 
        {
            label: "Indigo", 
            value: 73
        }, 
        {
            label: "Violet", 
            value: 100
        }
    ]

    app.get('/barData/:id', bodyParser.json(), (req, res) => {
        console.log(req.params)
        res.status(200).send(barData);
    });

     app.get('/lineData/:id', (req, res) => {
        res.status(200).send(lineData);
    });


    function runServer() {
        return new Promise((resolve, reject) => {
            app.listen(config.app.port, config.app.host, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }

                console.log(`Listening on ${config.app.host}:${config.app.port}`);
            });
        });
    }

    if (require.main === module) {
        runServer();
    }


    console.log(`Server running in soup n' stars mode`);
}
