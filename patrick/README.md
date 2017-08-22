# Mongo III

### Topics - OKAY √
* Separation of Concerns
  * MVC Architecture
* Relational Data in mongo
* Joins: [Populate](http://mongoosejs.com/docs/populate.html)

### Running the project - DONE √
* For this sprint you're going to be combining a bunch of the concepts that you've been working on thus far. Be sure to run `yarn install` in the root of your project and also in the `client` directory. Once you have all of your dependancies, fire up the client by running `yarn start`. (note we're using [Yarn](https://yarnpkg.com/en/),and you may have some issues if you use npm instead for the client server).
  ```console
  $  brew install yarn --without-node
      ==> Downloading https://yarnpkg.com/downloads/0.27.5/yarn-v0.27.5.tar.gz
      ==> Downloading from https://github-production-release-asset-2e65be.s3.amazonaws.com/49970642/5c9a9954-5db1-11e7-9d92-6ecbeb8f79
      ######################################################################## 100.0%
      🍺  /usr/local/Cellar/yarn/0.27.5_1: 13 files, 3.6MB, built in 12 seconds

  $  yarn install
      yarn install v0.27.5
      [1/4] Resolving packages...
      [2/4] Fetching packages...
      [3/4] Linking dependencies...
      [4/4] Building fresh packages...
      Done in 34.57s.

  $  cd client
  $  yarn install
      yarn install v0.27.5
      [1/4] Resolving packages...
      [2/4] Fetching packages...
      [3/4] Linking dependencies...
      [4/4] Building fresh packages...
      Done in 191.63s.
  ```
* To run the app server, run `npm start` in the root of the project and ensure that your `mongod` server is running as well!
  - `mkdir data` & `mongod --dbpath data` - OKAY √

* Your client has the following client side routes. You'll have to implement the backend in order to be able to navigate and use the client side application. You shouldn't have any thing to do on the front end. When your back end works your front end should start to work as well.
  - `'/'` our root route is a simple login page. This login form will hit submit a POST request to find a user in the DB and send that response back to the client. NOTE: We are storing the user's _id in `localstorage`. and using it to submit more data throughout the app.
  - `'/create-user'` this route has a create user form. This create user form will hit `/new-user'` and add a user to the DB
  - `'/posts'` this route will display all of the blog posts in the DB. Just the title will be shown. Each post will be a link to a 'single' blog post page.
  - `/posts:id` this route will take the user to the single blog post page. You can add comments on this page to a blog post.
  - `/new-post` this route will allow the user to create a new blog post. A title and content are given and sent up to the Server.
#### NOTE:
  - It is important to understand that READING THE CONSOLE will tell you whether or not your endpoints are working. If they're not working, you'll see an error message in the console explaining where the break down might possibly be.

### Todo
* You'll need implement the following routes/models/controllers in order for things to start to come together.
* You will want to start with the Models. You'll have a User Schema and Post Schema to implement.

#### POST '/new-user'
* The object that the client is sending is `{username: foo, password: bar}`. You'll need to implement the controller to handle this user object.

#### POST '/login'
* This route will be responsible for looking at the same type of object as above, but this time instead of using `save` you'll need to find the user in the DB an send it back to the client.

#### POST '/new-post'
* This route will take in a new blog post object and save it to the database. You'll need set this up to take an array of comments that can be `referenced` users by `ObjectId`.
* `/new-post` will also need a `reference` to the author (user) of the post.

```
{
  title: 'This is a fake blog post title',
  author: {
    name: 'Jen Urso'
    _id: '2lkj3j23,
  },
  _id: '234lj23kjh',
  content: 'This is some classy fake content',
  comments: [
    {text:'This is a class comment', author: 'Stanley Yelnats'},
  ]
}
```

#### GET '/posts'
* This route will return all of the blog posts you have stored in your database.
* All we're concerned about here is the blog title and the blog ID. Those are the only neccessary fields you'll need to send back to the client.
* The client is using the data like this, so at minimum you'll need to return out an array of objects like so:
```
posts: [
  {title: 'This is a fake post', _id: '325kjlljh'},
  {title: 'This is another fake post', _id: '234sdjlk'}
],
```
#### GET '/posts/:id'
* This get Post by Id end point should return an object of a single post's data:
```
post: {
  title: 'This is a fake blog post title',
  author: {
    name: 'Jen Urso'
    _id: '2lkj3j23,
  },
  _id: '234lj23kjh',
  content: 'This is some classy fake content',
  comments: [
    {text:'This is a class comment', author: 'Stanley Yelnats'},
  ]
},
```
#### UPDATE '/posts/:id'
* Your main concern with this `PUT/UPDATE` is to add a comment to the array of comments on a single blog post.
* You'll need to pull off the ID of the post from the route params to query for the post data.
* The data coming into this `PUT` should look like this:

```
  {text:'This is a class comment', author: 'AuthorId(ObjectId)'}
```

### Finished Product
* When all is said and done, you should be able to create a blog post and add comments to the previously created post. You can test that all of your `joining/refs` are working on the backend, by creating a new user and logging in as that user and commenting on a blog post.

### Extra Credit
* Add an additional schema for comments. Make sure it references both the user who authored the comment, as well as the comment's parent post.
* Add a new `/posts/:id/comments` from which new comments will be POSTed to.
* Don't forget to update your GET `/posts` and GET `/posts/:id` controller methods to populate the array of comments on each post.
