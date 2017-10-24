const Post = require("../models/postModels");

const STATUS_USER_ERROR = 422;
const handleUserError = (err, res) => {
  return res
    .status(STATUS_USER_ERROR)
    .json({ stack: err.stack, message: err.message });
};

const createPost = async (req, res) => {
  const { title, author, content } = req.body;
  try {
    const post = new Post({ title, author, content }).save();
    return res.json(post);
  } catch (error) {
    return handleUserError(error, res);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = Post.find().select("title _id");
    return res.json(posts);
  } catch (error) {
    return handleUserError(error, res);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = Post.findById(id)
      .populate({ path: "author", select: "username _id" })
      .populate("comments");
    return res.json(post);
  } catch (error) {
    return handleUserError(error, res);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  try {
    const post = await Post.findById(id);
    post.comments.push({ text, author, _parent: id });
    await post.save();
    return res.json(post);
  } catch (error) {
    return handleUserError(error, res);
  }
};
