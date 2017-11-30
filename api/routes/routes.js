const postControllers = require('../controllers/postControllers');
const userControllers = require('../controllers/userControllers');

module.exports = (app) => { 
  /* USER ROUTES */
  app
    .route('/new-user')
    .post(userControllers.createUser);

  app
    .route('/login')
    .post(userControllers.userLogin);

  /* POST ROUTES */
  app
    .route('/new-post')
    .post(postControllers.createPost);

  app
    .route('/posts')
    .get(postControllers.listPosts);

  app
    .route('/posts/:id')
    .get(postControllers.getPostById)
    .post(postControllers.addPostComment);
};
