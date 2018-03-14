const express = require('express');
const userRouter = express.Router();

module.exports = (app) => {
  //add your new routes here
  userRouter.post('/new-user', function(req, res){
  	console.log('posting new user');
  });
}
