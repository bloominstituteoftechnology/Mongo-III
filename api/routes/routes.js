// const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');

module.exports = (app) => {
  //add your new routes here
  app.route('/posts').get(postController.getPosts)
};
