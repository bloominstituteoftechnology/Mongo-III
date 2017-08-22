module.exports = (app) => {
  //add your new routes here
const userControllers = require('../controllers/userControllers')
app.route('/new-user')
  .post(userControllers.saveSingleUser);

app.route('/login')
  .post(userControllers)
}

/* 
module.exports = (app) => {
  const controllerMethods = require('../controllers/postsController');

app.route('/')


app.route('/new-user')
  .get(controllerMethods.listUsers)
  .post(controllerMethods.createUser);

app.route('/login')
  .get(controllerMethods.listUsers)
  .post(controllerMethods.createUser);

app.route('/posts')
  .get(controllerMethods.listPosts)
  .post(controllerMothods.createPost);

app.route('/posts/:id')
  .get(controllerMethods.findPost)
  .delete(controllerMethods).deletePost;

app.route('/new-post')
  .get(controllerMethods.listPosts)
  .post(controllerMethods).createPost;

};
*/