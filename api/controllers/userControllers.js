const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const UserName = mongoose.model('User');
const bodyParser = require('body-parser');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ userName, password });
  newUser.save()
  .then((err, user) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json(err); 
      return;
    }
    res.json(user);
  }); 
}

const listPost = (req, res) => {
  
}
