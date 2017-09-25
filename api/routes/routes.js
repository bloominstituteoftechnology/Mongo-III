const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

module.exports = (app) => {
  app.route('/new-user')
    .post(userControllers.create);
  app.route('/login')
    .post(userControllers.find);
  app.route('/new-post')
    .post(postControllers.create);
  app.route('/posts')
    .get(postControllers.findAll);
  app.route('/posts/:id')
    .get(postControllers.find)
    .put(postControllers.add)
    .patch(postControllers.sort);
  app.route('/comment/:id')
    .put(postControllers.likeAdd);
  app.route('/aggregated/')
    .get(postControllers.aggregate);
};