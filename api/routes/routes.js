const userControllerMethods = require('../controllers/userController');
const postControllerMethods = require('../controllers/postController');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(userControllerMethods.createUser)

  app
    .route('/login')
    .post(userControllerMethods.loginUser)

  app
    .route('/new-post')
    .post(postControllerMethods.createPost)

  app
    .route('/posts')
    .get(postControllerMethods.getPosts)

  app
    .route('/posts/:id')
    .get(postControllerMethods.getPost)
    .put(postControllerMethods.updatePost)
};
