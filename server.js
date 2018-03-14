const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3030;
const server  = express();
const User = require('./api/models/userModels');
const Post = require('./api/models/postModels');

const corsOptions = {
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-posts', { useMongoClient: true });

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(cors());

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.post('/new-user', function(req, res){
  	let newUser = req.body;
  	let user = new User(newUser);
  	user.save().then(savedUser => {
  		res.json(savedUser);
  	}).catch(err => {
  		res.json(err);
  	});
});

server.post('/login', function(req, res) {
    const username = req.body.username;

    User.find({ username: username })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => {
        res.json(err);
    });
});

server.post('/new-post', function(req, res){
  	let newPost = req.body;
  	let post = new Post(newPost);
  	post.save().then(savedPost => {
  		res.json(savedPost);
  	}).catch(err => {
  		res.json(err);
  	});
});

// - `'/posts'` this route will display all of the blog posts in the DB. Just the title will be shown. Each post will be a link to a 'single' blog post page.

// const routes = require('./api/routes/routes');
// routes(server);

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
