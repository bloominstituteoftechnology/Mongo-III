const userControllers = require('../controllers/userControllers')

module.exports = (app) => {
  //add your new routes here
  app.route('/new-user').post(userControllers.userCreate);
  app.route('/login').post(userControllers.userLogin);
  app.route('/new-post').post(postControllers.postsGetAll);
  app.route('/post/id:')
    .get(postControllers.postGetById);
    .put(postControllers.postCommentAdd);
};
