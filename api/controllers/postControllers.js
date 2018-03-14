const Post = require('../models/postModels');

const postCreate = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author, comments: [] });
  newPost
    .save()
    .then(post => {
      res.status(201).json(post);
    })
    .catch(errorSavingPost => {
      res.status(500).json(errorSavingPost);
    });
};

const postGetAll = (req, res) => {
  Post.find({})
    .select('title')
    .then(posts => {
      if (posts.length === 0) throw new Error();
      else res.status(200).json(posts);
    })
    .catch(errorGettingPosts => {
      res.status(500).json(errorGettingPosts);
    });
};

const postGetById = (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .populate('author comments')
    .then(post => {
      res.status(200).json(post);
    })
    .catch(errorGettingPost => {
      res.status(500).json(errorGettingPost);
    });
};

// const postUpdate = (req, res) => {
//   const id = req.params.id;
//   const comment = req.body;
//   Post.findByIdAndUpdate(id, comment, { new: true })
//     .then(post => {
//       res.status(200).json(post);
//     })
//     .catch(errorGettingPost => {
//       res.status(500).json(errorGettingPost);
//     });
// };

module.exports = {
  postCreate,
  postGetAll,
  postGetById,
  postUpdate,
};
