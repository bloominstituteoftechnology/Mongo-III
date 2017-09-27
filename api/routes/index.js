const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

module.exports = (app) => {
  app.use('/user', userRoutes);
  app.use('/post', postRoutes);

  // unhandled routes
  app.use((req, res) => res.status(404).json({ 
    error: `Unable to resolve ${req.originalUrl}` 
  }));
};
