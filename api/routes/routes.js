const postControllers = require('../controllers/postControllers');
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {
  //add your new routes here
  app.route('/new-user').post(userControllers.newUser);
  app.route('/login').post(userControllers.userLogin);
  app.route('/new-post').post(postControllers.newPost);
  app.route('/posts').get(postControllers.posts);
  app.route('/posts/:id').get(postControllers.post);
  app.route('/posts/:id').put(postControllers.editPost);
};