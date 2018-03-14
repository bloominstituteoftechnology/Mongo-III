const newUser = require('../controllers/userControllers');

module.exports = (app) => {
  app.post('/new-user', (req, res) => {
    newUser(req, res);
  });
};
