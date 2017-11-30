const postControllers = require('../controllers/postControllers');
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {
  app.route('/login').post(userControllers.login);
  app.route('/new-user').post(userControllers.createUser)
  app.route('/posts')
    .get(postControllers.listPosts)
  app
    .route('/posts/:id')
    .get(postControllers.findPost)
    .put(postControllers.addComment)
  app.route('/new-post').post(postControllers.createPost)
};
