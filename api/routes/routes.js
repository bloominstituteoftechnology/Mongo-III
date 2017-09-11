module.exports = (app) => {
  const userControllers = require('../controllers/userControllers');
  const postControllers = require('../controllers/postControllers');

  app.route('/new-user')
        .post(userControllers.createUser);
  
  app.route('/login')
        .post(userControllers.getUser);

  app.route('/new-post')
        .post(postControllers.createPost);
  
  app.route('/posts')
        .get(postControllers.getPosts);

  app.route('/posts/:id')
        .get(postControllers.getSinglePost)
        .put(postControllers.createComment);        
};
