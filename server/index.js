import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config({ silent: true}); 
mongoose.Promise = global.Promise; 

import Person from './models/person'; 

const jsonParser = bodyParser.json();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
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


app.get('/members', jsonParser, (req, res) => {
    Person.find({}, (err, data) => {
        if (err) {
          console.log('error was made')
            console.log(err)
            res.send(err)
        }
        res.status(200).json(data)
    })
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
