const { newUser, validateUser } = require('../controllers/userControllers');

module.exports = (app) => {
  app.post('/new-user', newUser); // POST takes a string (the route) and a callback function, no need for anon func here.
  app.post('/login', validateUser);
};
