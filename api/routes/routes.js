const UserController = require('../controllers/userControllers');
const PostController = require('../controllers/postControllers');

module.exports = (app) => {
  //add your new routes here
  app.route('/new-user').post(UserController.createUser);
  app.route('/login').post(UserController.login);
  app.route('/new-post').post(PostController.createPost);
  app.route('/posts/:id').get(PostController.getPost)
  .put(PostController.addComment);
};
