const { createUser, login } = require('../controllers/userControllers.js');
const { createPost, listPosts } = require('../controllers/postControllers.js');

module.exports = (app) => {
  app.post('/new-user', createUser);
  app.post('/login', login);

  app.post('/new-post', createPost);
  app.get('/posts', listPosts);
};
