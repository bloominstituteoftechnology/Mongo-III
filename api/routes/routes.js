const UserModel = require('../models/userModels'); //mongoose instance
const PostModel = require('../models/postModels'); //mongoose instance

module.exports = (appRouter) => {

    appRouter.get('/', (req, res) => {
        UserModel.find({})
            .then(user => res.status(200).send(user))
            .catch(err => res.status(400).send({
                error: `The information could not be reached. ${err}`
            }));
    });

    appRouter.post('/new-user', (req, res) => {
        const user = new UserModel(req.body);
        user.save()
            .then(usr => res.status(201).send(usr))
            .catch(err => {
                res.status(500).send({error: "Something went wrong saving your user information", info: err});
            });
    });

    appRouter.post('/login', (req, res) => {
        const user = new UserModel(req.body);
        UserModel.findOne({$and: [{username: user.username}, {password: user.password}]})
            .then(usr => (usr === null ? res.status(401).send() : res.status(200).send(usr)))
            .catch(err => {
                res.status(500).send({error: "Something went wrong login you in. Try again.", info: err});
            });
    });

    appRouter.post('/new-post', (req, res) => {
        const post = new PostModel(req.body);
        post.save()
            .then(pst => res.status(201).send(pst))
            .catch(err => {
                res.status(500).send({error: "Something went wrong saving the post", info: err});
            });
    });

    appRouter.get('/posts', (req, res) => {
        PostModel.find({})
            .then(post => res.status(200).send(post))
            .catch(err => res.status(400).send({
                error: `The information could not be reached. ${err}`
            }));
    });

    appRouter.get('/posts/:id', (req, res) => {
        PostModel.findById(req.params.id)
            .then(post => res.status(200).send(post))
            .catch(err => res.status(400).send({
                error: `The information could not be reached /posts/:id. ${err}`
            }));
    });

    appRouter.put('/posts/:id', (req, res) => {
        console.log('req.body:::', req.body);

        PostModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            .then(post => res.status(200).send(post))
            .catch(err => res.status(400).send({
                error: `The information could not be reached /posts/:id. ${err}`
            }));
    });


};
