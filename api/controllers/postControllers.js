const express = require('express');
const mongoose = require('mongoose');

const postsModels = require('../models/postModels.js');

const postsRouter = express.Router();

const getPosts = (req, res) => {
    postsModels.find()
    .then(posts => {
        if (posts === null || posts.length === 0) {
            res.status(400).json({ Error: `You cannot submit a blank post.`});
        }
        console.log('Retrieving posts');
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json(err);
      });
}


module.exports = { postsRouter, getPosts };
