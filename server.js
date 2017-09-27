const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;
const server  = express();

require('./api/domain/connectMongo');

const corsOptions = {
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(cors());

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const routes = require('./api/routes');
routes(server);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
