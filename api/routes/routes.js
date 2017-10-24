const postController = require("../controllers/postControllers");
const userController = require("../controllers/userControllers");

module.exports = app => {
  app.route("/posts").get(postController.getPosts);

  app
    .route("/posts/:id")
    .get(postController.getPost)
    .put(postController.createComment);

  app.route("/posts/:id/comments").post(postController.createComment);

  app.route("/new-post").post(postController.createPost);

  app.route("/new-user").post(userController.createUser);

  app.route("/login").post(userController.loginUser);
};
