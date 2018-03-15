const { newUser, validateUser } = require('../controllers/userControllers');
const { createPost, listPosts, getPost, addComment } = require('../controllers/postControllers');

module.exports = (app) => {
  app.post('/new-user', newUser); // POST takes a string (the route) and a callback function, no need for anon func here.
  app.post('/login', validateUser);
  app.post('/new-post', createPost);
  app.get('/posts', listPosts);
  app.route('/posts/:id').get(getPost).put(addComment);
};
