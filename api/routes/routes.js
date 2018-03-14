const userControllers = require('../controllers/userControllers');
const postControllers = require('../controllers/postControllers');

module.exports = app => {
  app.route('/new-user').post(userControllers.userCreate);
  app.route('/login').post(userControllers.userLogin);
};
