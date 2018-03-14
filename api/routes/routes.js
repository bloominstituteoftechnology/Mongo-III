const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');

module.exports = (app) => {
  //add your new routes here
  app.route('/create-post').post(postController.createPost)
  app.route('/posts').get(postController.getPosts)
  app.route('/posts/:id').post(postController.getPostById)
  app.route('/posts/:id').put(postController.updatePostById)

  //Users
  app.route('/new-user').post(userController.newUser)
  app.route('/login').post(userController.newLogin)
};
