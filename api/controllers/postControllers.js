const Post = require("../models/postModels");
const Comment = require("../models/commentModels");

const STATUS_USER_ERROR = 422;
const handleUserError = (err, res) => {
  return res
    .status(STATUS_USER_ERROR)
    .json({ stack: err.stack, message: err.message });
};

const createPost = async (req, res) => {
  const { title, author, content } = req.body;
  try {
    const post = await new Post({ title, author, content }).save();
    return res.json(post);
  } catch (error) {
    return handleUserError(error, res);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("title _id");
    return res.json(posts);
  } catch (error) {
    return handleUserError(error, res);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" }
      });
    return res.json(post);
  } catch (error) {
    return handleUserError(error, res);
  }
};

const createComment = async (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  try {
    const post = await Post.findById(id);
    const comment = await new Comment({ text, author, _parent: id }).save();
    post.comments.push(comment.id);
    await post.save();
    return res.json(post);
  } catch (error) {
    return handleUserError(error, res);
  }
};

module.exports = {
  createPost,
  getPost,
  getPosts,
  createComment
};
