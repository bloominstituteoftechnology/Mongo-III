const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3030;
const server  = express();

const corsOptions = {
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://germancin:secure123@167.99.10.46/blog-posts', { useMongoClient: true })
    .then(conn => console.log('Connected to MongoDB - Server:167.99.10.46 DB:blog-posts'))
    .catch(err => console.log('error :::: ' + err));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(cors());

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const routes = require('./api/routes/routes');
routes(server);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
