const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

module.exports = (app) => {
  app.post('/new-user', userControllers.create);
  app.post('/login', userControllers.find);
  app.post('/new-post', postControllers.create);
  app.get('/posts', postControllers.findAll);
  app.get('/posts/:id', postControllers.find);
  app.put('/posts/:id', postControllers.add);
  app.put('/comment/:id', postControllers.likeAdd);
  app.patch('/posts/:id', postControllers.sort);
  app.get('/aggregated/', postControllers.aggregate);
};