const postControllers = require('../controllers/postControllers');
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {
  app.route('/new-post').post(postControllers.createPost);
  app.route('/posts').get(postControllers.getPosts);
  app.route('/posts:id').get(postControllers.findById).put(postControllers.updatePost);
  app.route('/login').post(userControllers.login);
  app.route('/new-user').post(userControllers.newUser);
};
