const {createUser, loginUser} = require('../controllers/userControllers');
const {createPost,} = require('../controllers/userControllers');
module.exports = app => {
  //add your new routes here
  app.post('/new-user',createUser);
  app.post('/login', loginUser);
};
