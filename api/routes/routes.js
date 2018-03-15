const userRoutes = require('../controllers/userControllers');
const postRoutes = require('../controllers/postControllers');

module.exports = app => {
  //add your new routes here
  app.use('/', userRoutes);
  app.use('/', postRoutes);
};
