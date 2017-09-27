const express = require('express');
const postControllers = require('../controllers/post');
const userControllers = require('../controllers/user');

const router = express.Router();

router
  .route('/new-user')
  .post(userControllers.newUser);

router
  .route('/login')
  .post(userControllers.login);

router
  .route('/new-post')
  .post(postControllers.newPost);

router
  .route('/posts')
  .get(postControllers.getPosts);

router
  .route('/posts/:id')
  .get(postControllers.getPost)
  .put(postControllers.newComment);

router
  .route('/posts/:id/comments')
  .post(postControllers.newComment);

module.exports = router;
