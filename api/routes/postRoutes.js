const express = require('express');

const { 
  getAllPosts,
  getPostById,
  createPost,
  createPostComment
} = require('../services/postServices');

const { asyncResponse } = require('../utils/requestResponse');

const router = express.Router();

router

  .get('/', (req, res) => asyncResponse(getAllPosts(), res))

  .get('/:id', (req, res) => asyncResponse(getPostById(req.params.id), res))

  .post('/new', (req, res) => asyncResponse(createPost(req.body), res))

  .post('/:id/comments/new', (req, res) => {
    const comment = { _parent: req.params.id, ...req.body };
    return asyncResponse(createPostComment(comment), res);
  })

module.exports = router;
