const postControllers = require("../controllers/postControllers")();
const userControllers = require("../controllers/userControllers")();

module.exports = app => {
  //add your new routes here
  app.post("/new-user", userControllers.create);
  app.post("/login", userControllers.auth);
  app.post("/new-post", postControllers.create);
  app.get("/posts", postControllers.getAll);
  app.post("/posts/:id/comments", postControllers.createComment);
  app
    .route("/posts/:id")
    .get(postControllers.getOne)
    .put(postControllers.updateOne);
  
};
