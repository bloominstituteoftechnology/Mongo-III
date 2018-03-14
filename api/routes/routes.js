const userRoutes = require('../controllers/userControllers');

module.exports = app => {
  //add your new routes here
	app.use('/', userRoutes);
};
