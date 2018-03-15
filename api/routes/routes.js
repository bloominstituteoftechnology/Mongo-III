const postControllers = require('../controllers/postControllers');
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {
  app.route('/new-post').post(postControllers.createPost);
  app.route('/posts').post(postControllers.getPosts);
  app.route('/posts:id').post(postControllers.findById);
  app.route('/login').post(userControllers.login);
  app.route('/new-user').post(userControllers.newUser);
};
