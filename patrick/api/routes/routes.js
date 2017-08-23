module.exports = (app) => {
  //add your new routes here

  const userControllers = require('../controllers/userControllers');
  const postControllers = require('../controllers/postControllers');
  app.route('/new-user')
      .post(userControllers.createUser);
  app.route('/login')
      .post(userControllers.login);
  app.route('/new-post')
      .post(postControllers.createPost);
  // app.route('/post')
  //     .get(postControllers.listPosts);
  // app.route('/post/:id')
  //     .get(postControllers.getPostById);
  //     .put(postControllers.updatePost);
};
