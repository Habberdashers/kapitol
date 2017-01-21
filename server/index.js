'use strict';

const config = require('./config');
const logger = require('./utils/logger');


if (process.argv.length > 2 && process.argv[process.argv.length - 1] === 'members') {
    const UserResponseHandler = require('./handlers/user-response-handler');
    const _ = require('underscore');
    const requestHandler = require('./handlers/request-handler');
    const jsonFile = require('jsonfile');
    const path = require('path');

    requestHandler.makeRequest(
        'https://www.govtrack.us/api/v2/vote_voter/?vote=1&limit=441',
        (error, members) => {
            if (error) {
                return logger(error);
            }

            const userResponseHandler = new UserResponseHandler(members.objects);
            userResponseHandler.processData();
            jsonFile.writeFileSync(
                path.join(__dirname, 'files/members.json'),
                userResponseHandler.getParsedMembers()
            );
        }
    );
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
