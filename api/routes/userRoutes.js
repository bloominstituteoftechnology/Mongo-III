const express = require('express');

const { createUser, loginUser } = require('../services/userServices');
const { asyncResponse } = require('../utils/requestResponse');

const router = express.Router();

router

  .post('/new', (req, res) => asyncResponse(createUser(req.body), res))
  
  .post('/login', (req, res) => asyncResponse(loginUser(req.body), res))

module.exports = router;