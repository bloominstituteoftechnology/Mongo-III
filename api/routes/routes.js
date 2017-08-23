module.exports = (app) => {
  const postMethods = require('../controllers/postControllers');
  const userMethods = require('../controllers/userControllers');

  app.route('/new-user')
    .post(userMethods.createUser);

  app.route('/login')
    .post(userMethods.loginUser);

  app.route('/new-post')
    .post(postMethods.createPost);

  app.route('/posts')
    .get(postMethods.listPosts);

  app.route('/posts/:id')
    .get(postMethods.findPost)
    .put(postMethods.updatePost);
};
