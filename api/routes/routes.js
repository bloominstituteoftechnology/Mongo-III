const userControllerMethods = require('../controllers/userControllers');
const postControllerMethods = require('../controllers/postControllers');

module.exports = (app) => {
  app
    .route('/login')
    .get(userControllerMethods.login)
    .post(userControllerMethods.login);
  app.route('/new-user').post(userControllerMethods.createUser);
  app.route('/new-post').post(postControllerMethods.createPost);
  app.route('/posts').post(postControllerMethods.createPost);
  app.route('/posts').get(postControllerMethods.listPosts);
  app
    .route('/posts/:id')
    .get(postControllerMethods.findPost)
    .put(postControllerMethods.addComment);
};
