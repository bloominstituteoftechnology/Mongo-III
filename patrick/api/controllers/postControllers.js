const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  // newPost.save((err, post) => {
  //   if (err) {
  //     res.status(STATUS_USER_ERROR);
  //     res.json(err);
  //     return;
  //   }
  //   res.json(post);
  // });
  newPost.save()
    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => {
        res.status(STATUS_USER_ERROR);
        res.json({ stack: err.stack, message: err.message });
    });
}

const listPosts = (req, res) => {
  Post.find({})
    .populate()
    // .populate('_author')
    // .populate('title', 'author')
    .exec()
    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => {
        res.status(STATUS_USER_ERROR);
        res.json({ stack: err.stack, message: err.message });
    });
};

const getPostById = (req, res) => {
  const { postId } = req.params;
  // console.log(req.params);
  // console.log(req.body);
  // const { title, comments, content, author } = req.body;
  // Post.findOne(postId)
  Post.findOne({ postId })
    .populate()
    // .populate('_parent')
    // .populate('title', 'author', 'content', 'comments')
    .exec()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      // console.log(post);
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
};

const updatePostById = (req, res) => {
  //
};

const addComment = (req, res) => {
  // const { id } = req.params;
  // const { content } = req.body;
  //
  // const newComment = new Comment({ _parent: id, comment });
  // newComment.save()
  //     .then((comment) => {
  //         Post.findById(id)
  //             .exec()
  //             .then((post) => {
  //                 post.comments.push(comment);
  //                 post.save();
  //                 res.send({ success: true });
  //             })
  //             .catch((err) => {
  //             res.status(STATUS_USER_ERROR);
  //             res.json({ stack: err.stack, message: err.message });
  //         });
  //     })
  //     .catch((err) => {
  //         res.status(STATUS_USER_ERROR);
  //         res.json({ stack: err.stack, message: err.message });
  //     });
};

// const deletePostById = (req, res) => {
//   //
// };

module.exports = {
  createPost,
  listPosts,
  getPostById,
  updatePostById,
  addComment,
  // deletePostById,
}
