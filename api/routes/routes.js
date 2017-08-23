module.exports = (app) => {
  const postControllers = require('../controllers/postControllers');
  const userControllers = require('../controllers/userControllers');

  app.route('/new-user')
    .post(userControllers.createUser);

  app.route('/login')
    .post(userControllers.loginUser);

  app.route('/new-post')
    .post(postControllers.createPost);

  app.route('/posts')
    .get(postControllers.listPosts);

  app.route('/posts/:id')
    .get(postControllers.findPost)
    .put(postControllers.updatePost);
};
