const controllers = require('../controllers');

module.exports = (app) => {
  app
    .route('/login')
    .post(controllers.authenticateUser);

  app
    .route('/new-user')
    .post(controllers.addUser);

  app
    .route('/new-post')
    .post(controllers.addPost);

  app
    .route('/posts')
    .get(controllers.getPosts);

  app
    .route('/posts/:id')
    .get(controllers.getPost)
    .put(controllers.addComment);
};
