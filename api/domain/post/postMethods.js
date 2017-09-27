const Post = require('./postModel');

const postsGetAll = async () => Post
  .find()
  .populate('comments', 'text')

const postGetById = async id => Post
  .findById(id)
  .populate('comments', 'text')

const postFindOne = async q => Post
  .findOne(q)
  .populate('comments', 'text')

const postNew = async post => new Post(post)
  .save();

const postUpdate = async post => Post
  .findByIdAndUpdate(post._id, post);

module.exports = {
  postsGetAll,
  postGetById,
  postNew,
  postUpdate
};