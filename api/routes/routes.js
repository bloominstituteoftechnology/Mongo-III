const postControllers = require("../controllers/postControllers");
const userControllers = require("../controllers/userControllers");

module.exports = app => {
  //add your new routes here
  app.route("/new-user").post(userControllers.addUser);

  app.route("/login").post(userControllers.userLogin);

  app.route("/new-post").post(postControllers);

  app.route("/posts").get(postControllers);

  app.route("/posts/:id").get(postControllers);

  app.route("/posts/:id").update(postControllers);
};
