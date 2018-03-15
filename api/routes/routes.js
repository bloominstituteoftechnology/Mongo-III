const User = require('../models/userModels');
const Post = require('../models/postModels');
const Comments = require('../models/commentsModels');

module.exports = (app) => {
 app.post('/new-user', function(req, res){
  	let newUser = req.body;
  	let user = new User(newUser);
  	user.save().then(savedUser => {
  		res.json(savedUser);
  	}).catch(err => {
  		res.json(err);
  	});
});

app.post('/login', function(req, res) {
    const username = req.body.username;
    User.find({ username: username })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post('/new-post', function(req, res){
  	let newPost = req.body;
  	let post = new Post(newPost);
  	post.save().then(savedPost => {
  		res.json(savedPost);
  	}).catch(err => {
  		res.json(err);
  	});
});

app.get('/posts', function(req, res) {
    Post.find()
    .populate("comments")
    .then(post => {
        console.log(post);
        res.json(post);
    })
    .catch(err => {
        res.json(err);
    });
})

app.get('/posts/:id', function(req, res) {
   Post.findById(req.params.id)
   .populate('comments')
   .then(post => {
   	res.json(post);
   }).catch(err => {
   	res.json(err);
   });
})

app.put('/posts/:id', function(req, res) {
    const id = req.params.id;
    const newComment = {
        text : req.body.text,
        author : req.body.author,
        parent : id,
    }
    let comment = new Comments(newComment);
    comment.save().then(savedComment => {

    	Post.findByIdAndUpdate(id, { "$push": { "comments":  savedComment._id}}, { "new": true })
    	.then(updatedPost => {
    		res.json(updatedPost);
    	}).catch(); 
    }).catch(err => {
        res.json(err);
    });
})
}
