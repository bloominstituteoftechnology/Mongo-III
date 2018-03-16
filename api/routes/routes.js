const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');

module.exports = (appRouter) => {

    appRouter.get('/', (req, res) => {
        UserModel.find({})
            .then(user => res.status(200).send(user))
            .catch(err => res.status(400).send({
                error: `The information could not be reached. ${err}`
            }));
    });

    appRouter.route('/new-user').post(userController.createUser);
    // appRouter.post('/new-user', (req, res) => {
    //     const user = new UserModel(req.body);
    //     user.save()
    //         .then(usr => res.status(201).send(usr))
    //         .catch(err => {
    //             res.status(500).send({error: "Something went wrong saving your user information", info: err});
    //         });
    // });

    appRouter.route('/login').post(userController.loginUser);
    // appRouter.post('/login', (req, res) => {
    //     const user = new UserModel(req.body);
    //     UserModel.findOne({$and: [{username: user.username}, {password: user.password}]})
    //         .then(usr => (usr === null ? res.status(401).send() : res.status(200).send(usr)))
    //         .catch(err => {
    //             res.status(500).send({error: "Something went wrong login you in. Try again.", info: err});
    //         });
    // });

    appRouter.route('/new-post').post(postController.createPost);
    // appRouter.post('/new-post', (req, res) => {
    //     const post = new PostModel(req.body);
    //     post.save()
    //         .then(pst => res.status(201).send(pst))
    //         .catch(err => {
    //             res.status(500).send({error: "Something went wrong saving the post", info: err});
    //         });
    // });

    appRouter.route('/posts').get(postController.getAllPosts);
    // appRouter.get('/posts', (req, res) => {
    //     PostModel.find({})
    //         .populate('author')
    //         .exec((err, post) => {
    //             res.status(200).send(post)
    //         });
    // });

    appRouter.route('/posts/:id').get(postController.getPostById);
    // appRouter.get('/posts/:id', (req, res) => {
    //     PostModel.findById(req.params.id)
    //         .populate({
    //             path: 'author',
    //         })
    //         .populate({
    //             path: 'comments.author',
    //         })
    //         .exec((err, post) => {
    //             res.status(200).send(post)
    //         });
    // });

    appRouter.route('/posts/:id').put(postController.updatePostById);
    // appRouter.put('/posts/:id', (req, res) => {
    //     PostModel.findByIdAndUpdate(req.params.id, { "$push": { "comments": req.body } }, { new: true })
    //         .populate('author')
    //         .exec((err, post) => {
    //             res.status(200).send(post)
    //         });
    // });

};
