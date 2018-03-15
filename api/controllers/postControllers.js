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
    .populate('author')
    .populate({path: 'comments.author', select: 'username -_id'})
    .then(post => {
      res.status(200).json(post);
    })
    .catch(errorGettingPost => {
      res.status(500).json(errorGettingPost);
    });
};

const postUpdate = (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  Post.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
    .then(post => {
      res.status(200).json(post.comments);
    })
    .catch(error => {
      res.status(500).json(error);
    });

  // Why doesn't push work?
  // What is the difference between .exec and .then?
  // Why does it populate in the console but not in the UI?

  // Post.findById(id, (findErr, post) => {
  //   post.comments.push(comment);
  //   post
  //     .save((saveErr, savedPost) => {
  //       if (saveErr) console.log('SAVE ERROR!: ', saveErr);
  //       else console.log(savedPost);
  //     })
  //     .then(savedPost => {
  //       Post.findById(savedPost._id)
  //         .populate('comments.author', 'username')
  //         .then(populatedPost => {
  //           res.status(200).json(populatedPost);
  //         })
  //         .catch(err => console.log('Final Error: ', err));
  //     });
  // });
};

module.exports = {
  postCreate,
  postGetAll,
  postGetById,
  postUpdate,
};
