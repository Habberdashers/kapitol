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
} else {
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();
    const memberRoutes = require('./routes/member-routes');

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

    const memberData = {
        "name" : "Paul Ryan",
        "state" : "Wisconsin",
        "district" : "1D",
        "party" : "Republican"
    }


    app.get('/members', bodyParser.json(), (req, res) => {
        res.status(200).send(memberData);
        // Person.find({}, (err, data) => {
        //     if (err) {
        //         console.log('error was made');
        //         console.log(err)
        //         res.send(err)
        //     }
        //     res.status(200).json(data)
        // })
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
