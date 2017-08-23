module.exports = (app) => {
  //add your new routes here
  const postControllerMethods = require('../controllers/postControllers');
  const userControllerMethods = require('../controllers/userControllers');


  app.route('/showUsers')
    .get(userControllerMethods.showUsers);

  app.route('/new-user')
    .post(userControllerMethods.createUser);

  app.route('/login')
    .post(userControllerMethods.userLogin);

  app.route('/new-post')
    .post(postControllerMethods.newPost);

  app.route('/posts')
    .get(postControllerMethods.getAllPosts);

  app.route('/posts/:id')
    .get(postControllerMethods.getSinglePost);

  app.route('/posts/:id')
    .put(postControllerMethods.addComment);

  app.route('/post/:id/comments')
    .get(postControllerMethods.showAllComments);
};
