module.exports = (app) => {
  //add your new routes here

  const userControllers = require('../controllers/userControllers');

  // // http://localhost:3030/  <~~~ LOG IN EXISTING USER ???
  // app.route('/login')
  // http://localhost:3030/login
  // app.route('/login')
  //   .post(userControllers.login)

  // http://localhost:3000/create-user
  // http://localhost:3030/new-user
  app.route('/new-user')
      .post(userControllers.createUser);

  app.route('/login')
      .post(userControllers.userLogin);

  app.route('/new-post')
      .post(userControllers.makeNewPost);

};
