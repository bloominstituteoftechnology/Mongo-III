module.exports = (app) => {
  // add your new routes here

  const userControllers = require('../controllers/userControllers');
  const postControllers = require('../controllers/postControllers');

  app.route('/new-user')
      .post(userControllers.createUser);

  app.route('/login')
      .post(userControllers.login);

  app.route('/new-post')
      .post(postControllers.createPost);

  // not sure I need this post route
  app.route('/post')
      .get(postControllers.listPosts);

  // plural or single? I think the plural is just for the list of posts
  app.route('/post/:id')
  // app.route('/posts/:id')
      .get(postControllers.getPostById)
      .put(postControllers.updatePostById);
};
