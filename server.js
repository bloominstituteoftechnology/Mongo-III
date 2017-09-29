const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3030;
const server = express();

const handler = require('./api/helpers');
const routes = require('./api/routes/routes');

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-posts', { useMongoClient: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use('/', routes);
server.use(handler.notFound);
server.use(handler.validationErrors);
if (server.get('env') === 'development') server.use(handler.dHandleErrors);
server.use(handler.pHandleErrors);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
