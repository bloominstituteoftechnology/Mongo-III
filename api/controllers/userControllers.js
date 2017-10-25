const mongoose = require('mongoose');

require("../models/postModels");
require("../models/userModels");
// const Post = mongoose.model('Post');
const User = mongoose.model('User');
// const Comment = mongoose.model('Comment');

const createUser = (req, res) => {
	const { username, password } = req.body;

	const newUser = new User({ username, password });

	newUser.save()
		.then((user) => {
			res.json(user);
		})
		.catch((err) =>{
			res.status(422).json(err);
		})
};

const login = (req, res) => {
	const { username, password } = req.query;

	User.findOne({username: username, password: password})
	// when do you use exec()?
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			res.status(422).json(err);
		})
};

// const indexPage = (req, res) => {
// 	// send back index page
// }

module.exports = {
	// indexPage,
  createUser,
  login
};