const postMethods = require('../controllers/postControllers');
const userMethods = require('../controllers/userControllers');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(userMethods.newUser);

  app
    .route('/login')
    .post(userMethods.loginUser);

  app
    .route('/new-post')
    .post(postMethods.newPost);

  app
    .route('/posts')
    .get(postMethods.getPosts);

  app
    .route('/posts/:id')
    .get(postMethods.getPost)
    .put(postMethods.addComment);
};
