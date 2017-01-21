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
    const path = require('path');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static(process.env.CLIENT_PATH));
    app.use('/api/members', memberRoutes);

    //var govTrack = require('govtrack-node');

// list current members of Congress
// govTrack.findRole({ current: true }, function(err, res) {
//   if (!err) {
//     // res contains JSON data response
//     console.log(res);
//   }
// });
//
// govTrack.findPerson({ gender: 'male', lastname: 'smith' }, function(err, res) {
//   if (!err) {
//     console.log(res);
//   }
// });

    app.get('/api', (req, res) => {
        govTrack.findPerson({gender: 'male'}, function(err, data) {
            if (err) {
                console.log(err)
                res.status(500).json({"message": 'something blew up'})
            } else {
                console.log(res);
                res.status(200).json({data});
            }
        });
    })


    app.get('/members/:searchTerm', (req, res) => {
        console.log(req.params);
    })

    app.get('/members', bodyParser.json(), (req, res) => {
        Person.find({}, (err, data) => {
            if (err) {
                console.log('error was made');
                console.log(err)
                res.send(err)
            }
            res.status(200).json(data)
        })
    });

    app.post('/members', bodyParser.json(), (req, res) => {
        Person.create(req.body)
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))
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
