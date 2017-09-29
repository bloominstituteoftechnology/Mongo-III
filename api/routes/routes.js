const express = require('express');
const postControllers = require('../controllers/post');
const userControllers = require('../controllers/user');
const { catchErrors } = require('../helpers');

const router = express.Router();

router
  .route('/new-user')
  .post(catchErrors(userControllers.newUser));

router
  .route('/login')
  .post(catchErrors(userControllers.login));

router
  .route('/new-post')
  .post(catchErrors(postControllers.newPost));

router
  .route('/posts')
  .get(catchErrors(postControllers.getPosts));

router
  .route('/posts/:id')
  .get(catchErrors(postControllers.getPost))
  .put(catchErrors(postControllers.newComment));

router
  .route('/posts/:id/comments')
  .post(catchErrors(postControllers.newComment));

module.exports = router;
