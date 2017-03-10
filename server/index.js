import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import memberRoutes from './routes/member-routes';

const jsonParser = bodyParser.json();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.static(process.env.CLIENT_PATH));

// include the module 
var govTrack = require('govtrack-node');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(process.env.CLIENT_PATH));
app.use('/api/members', memberRoutes);



function runServer() {
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
