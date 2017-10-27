// pull in the methods from the controllers folder

module.exports = app => {
  const postControllerMethods = require('../controllers/postControllers.js');
  const userControllerMethods = require('../controllers/userControllers.js');

  //add your new routes here
  app.route('/new-user').post(userControllerMethods.createUser);

  app.route('/login').post(userControllerMethods.login);

  app.route('/new-post').post(postControllerMethods.createNewPost);

  app.route('/posts').get(postControllerMethods.getAllBlogPosts);

  app
    .route('posts/:id')
    .get(postControllerMethods.getPostById)
    .put(postControllerMethods.addCommentsToPost);
};
