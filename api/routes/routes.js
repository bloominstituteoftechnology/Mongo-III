const postControllers = require('../controllers/postControllers');
const userControllers = require('../controllers/userControllers');

module.exports = (app) => {
  app
    .route('/new-user')
    .post(userControllers.createUser);
  app
    .route('/login')
    .post(userControllers.userLogin);
};
