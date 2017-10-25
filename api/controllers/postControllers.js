const mongoose = require('mongoose');

require("../models/postModels");
require("../models/userModels");

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
// const User = mongoose.model('User');

const getPosts = (req, res) => {
	Post.find()
		.populate('comments', 'text')
		.exec()
		.then((posts) => {
			res.json(posts);
		})
		.catch((err) => {
			res.status(500).json(err);
		})
}

const getPost = (req, res) => {
	const { id } = req.params;

	Post.findById(id)
		.populate('comments', 'text')
		.exec()
		.then((post) => {
			res.json(post);
		})
		.catch((err) => {
			res.status(500).json(err);
		})
}

const createPost = (req, res) => {
	const { author, title, content } = req.body;

	// have to reference author
	const newPost = new Post({ author, title, content });

	newPost.save()
		.then((post) => {
			res.json(post);
		})
		.catch((err) => {
			res.status(422).json(err);
		})
};

const addComment = (req, res) => {
	const { text } = req.body;
	const { id } = req.params;

	// create comment
	const newComment = new Comment({ text, author: id });
	// console.log(newComment);
	newComment.save()
		.then((comment) => {
			console.log(id);
			Post.findById(id)
				// .exec()
				.then((p) => {
					console.log(p);
					p.comments.push(comment);
					p.save()
					res.send({succes: true});
				})
				.catch((err) => {
					res.json(err);
				})
			// res.json(comment);
		})
		.catch((err) => {
			res.status(500).json(err);
		})

	// update post doc with reference to new comment
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  addComment
};