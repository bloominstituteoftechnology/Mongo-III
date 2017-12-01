const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');


module.exports = app => {
  app
    //instructor below;
    //app.route('/new-user').post(userControllers.createUser);
    .route('/new-user')
    .post(userControllers.createUser);

  app
    //app.route('/login').post(userControllers.findUser);
    .route('/login')
    .post(userControllers.findUser);

  app
    .route('/new-post')
    .post(postControllers.createPost);

  app
    .route('/posts')
    .get(postControllers.listPosts);
  
  app
    .route('/posts/:id')
    .get(postControllers.getPost)
    .put(postControllers.updatePost)
};
