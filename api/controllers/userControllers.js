const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const UserName = mongoose.model('User');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { userName, password } = req.params;
  const newUser = new User({ userName, password });
} 

const listPost = (req, res) => {
  
}
