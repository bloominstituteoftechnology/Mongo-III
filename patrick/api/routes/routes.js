module.exports = (app) => {
  //add your new routes here

  const controllerMethods = require('../controllers/userController');

  app.route('/posts')
     // Login: http://localhost:3000/
    //  .get(controllerMethods.listUsers)
     // http://localhost:3000/create-user
     .post(controllerMethods.createUser);

};
