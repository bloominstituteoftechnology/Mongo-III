module.exports = (app) => {
  //add your new routes here
  const userControllers = require('../controllers/userControllers.js');
  const postControllers = require('../controllers/postControllers.js');

  app.route('/new-user') 
    .post(userControllers.newUser)
  
  app.route('/login')
    .post(userControllers.userLogin)

  app.route('/new-post')
    .post(postControllers.newPost)

  app.route('/posts')
    .get(postControllers.getPosts)
  
  app.route('/posts/:id')
    .get(postControllers.getPostsById)
    .put(postControllers.addComment)
};
