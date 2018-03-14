module.exports = (app) => {
  //add your new routes here

  Router.get('/', function(req, res) {}); //login page. Submits a POST request to find a user in the DB and send that response back to the client. 


  Router.____('/create-user', function(req, res) {}); // create user form. 
  
  Router.get('/posts', function(req, res) {

  }); // display all of the blog posts in the DB. 

  Router.get(/posts:id, function(req, res) {
    git
  }); // navigate to the single blog post page. 
  
  Router.____(/new-post, function(req, res) {}); // create a new blog post. 
};
