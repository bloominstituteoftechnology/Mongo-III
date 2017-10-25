const postController = require('../controllers/postControllers');
const userController = require('../controllers/userControllers');
module.exports = (app) => {
  app
  .route('/login')
  .post(userController.checkUser);

  app
  .route('/new-user')
  .post(userController.addUser);

  app
  .route('/posts')
  .get(postController.listPosts);

  app
  .route('/posts/:id')
  .get(postController.getPost)
  .put(postController.addComment);

  app
  .route('/new-post')
  .post(postController.addPost);
};
