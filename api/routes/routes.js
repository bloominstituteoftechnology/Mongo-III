const userControllerMethods = require('../controllers/userControllers');
const postControllerMethods = require('../controllers/postControllers');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(userControllerMethods.createUser);

  app
    .route('/login')
    .post(userControllerMethods.getUser);
};
