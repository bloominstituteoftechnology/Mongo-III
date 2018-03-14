const newUser = require('../controllers/userControllers');


module.exports = (app) => {
  app.post('/new-user', (req, res) => {
    newUser(req.body)
    .then(user => res.send(user))
    .catch(err => res.send(err));
  });
  
};

