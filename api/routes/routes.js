module.exports = (app) => {
  //add your new routes here
const userControllers = require('../controllers/userControllers');  
const postControllers = require('../controllers/postControllers');

app.route('/new-user')
  .post(userControllers.saveSingleUser);

app.route('/login')
  .post(userControllers.userLogin);

app.route('/new-post')
  .post(postControllers.makeNewPost);

app.route('/posts')
  .get(postControllers.listPosts);

app.route('/posts/:id')
  .get(postControllers.findSinglePost)
  .put(postControllers.addComment);

}