const UserController = require('../controllers/userControllers');


module.exports = (app) => {
  //add your new routes here
  app.route('/new-user').post(UserController.createUser);
  app.route('/login').post(UserController.login);
};
