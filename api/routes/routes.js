const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

module.exports = app => {
  app.route('/new-user').post(userControllers.userCreate);
  app.route('/login').post(userControllers.userLogin);
  app.route('/new-post').post(postControllers.postCreate);
  app.route('/posts').get(postControllers.postsGetAll);
  app
    .route('/posts/:id')
    .get(postControllers.postGetById)
    .put(postControllers.postCommentAdd);
};
