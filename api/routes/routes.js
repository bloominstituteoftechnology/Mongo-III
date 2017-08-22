module.exports = (app) => {
  const controllerMethods = require('../controllers/postsController');

app.route('/')


app.route('/create-user')
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
