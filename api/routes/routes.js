const controllerMethods = require('../controllers/postControllers');

module.exports = (app) => {
  //add your new routes here
  app
    .route('/')
    .post(controllerMethods.listPosts);
};
