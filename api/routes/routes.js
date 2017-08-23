module.exports = (app) => {
  //add your new routes here
  const postControllerMethods = require('../controllers/postControllers'); 
  const userControllerMethods = require('../controllers/userControllers'); 

  app.route('/new-user')
  .post(userControllerMethods.createUser);

  app.route('/login')
  .post(userControllerMethods.findUser);

  app.route('/new-post')
  .post(postControllerMethods.createPost);

  // app.route('/posts')
  // .get(postControllerMethods.listPosts);

  // app.route('/posts/:id')
  // .get(postControllerMethods.singlePost)
  // .put(postControllerMethods.updatePost);

};
