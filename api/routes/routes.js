module.exports = (app) => {
  //add your new routes here
  const userController = require('../controllers/userControllers');
  const postController = require('../controllers/postControllers');
  app.route('/new-user')
  .post(userController.createUser);
  app.route('/login')
  .post(userController.userLogin);
  app.route('/new-post')
  .post(postController.createPost);
  app.route('/posts')
  .get(postController.postList);
  app.route('/posts/:id')
  .get(postController.getPost)
  .put(postController.updatePost);
};
