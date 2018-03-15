const postControllers = require('../controllers/postControllers');

module.exports = (app) => {
  //add your new routes here
  app.route('/new-post').post(postControllers.createPost);
  app.route('/posts').post(postControllers.getPosts);
  app.route('/posts:id').post(postControllers.findById);
};
