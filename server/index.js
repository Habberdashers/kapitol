
if (process.argv.length > 2 && process.argv[process.argv.length - 1] === 'members') {
    const UserResponseHandler = require('./handlers/user-response-handler');
    const _ = require('underscore');
    const requestHandler = require('./handlers/request-handler');
    requestHandler.makeRequest(
        'https://www.govtrack.us/api/v2/vote_voter/?vote=1&limit=441',
        (error, members) => {
            if (error) {
                return logger(error);
            }

            const userResponseHandler = new UserResponseHandler(members.objects);
            userResponseHandler.processData();
            _.each(userResponseHandler.getParsedMembers(), (member) => {
                logger(member);
            });
        }
    );
} else {
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();

app.use(express.static(process.env.CLIENT_PATH));

var govTrack = require('govtrack-node');
 
// list current members of Congress 
// govTrack.findRole({ current: true }, function(err, res) {
//   if (!err) {
//     // res contains JSON data response 
//     console.log(res); 
//   }
// });
 
// govTrack.findPerson({ gender: 'male', lastname: 'smith' }, function(err, res) {
//   if (!err) {
//     console.log(res); 
//   }
// });

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err);
})

app.get('/api', (req, res) => {
   govTrack.findPerson({gender: 'male'}, function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json({"message": 'something blew up'})
        }
        else {
            console.log(res);
            res.status(200).json({data});
        } 
    });
})


app.get('/members/:searchTerm', (req, res) => {
    console.log(req.params); 
})


const temp = {
    "name": "Paul Ryan", 
    "state": "Wisconsin", 
    "district": "1D", 
    "party": "Republican"
}

app.get('/members/', (req, res) => {
    res.status(200).json(temp); 

    // Person.find({}, (err, data) => {
    //     if (err) {
    //       console.log('error was made')
    //         console.log(err)
    //         res.send(err)
    //     }
    //     res.status(200).json(data)
    // })
})

app.post('/members', jsonParser, (req, res) => {
  Person.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err))
})

function runServer() {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://user:kapitol@ds117819.mlab.com:17819/kapitol'  
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer();
}


console.log(`Server running in ${process.env.NODE_ENV} mode`);
