const UserModel = require('../models/userModels');

const createUser = (req, res) => {
    const user = new UserModel(req.body);
    user.save()
        .then(usr => res.status(201).send(usr))
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving your user information", info: err});
        });
};

const loginUser = (req, res) => {
    const user = new UserModel(req.body);
    UserModel.findOne({$and: [{username: user.username}, {password: user.password}]})
        .then(usr => (usr === null ? res.status(401).send() : res.status(200).send(usr)))
        .catch(err => {
            res.status(500).send({error: "Something went wrong login you in. Try again.", info: err});
        });
};

module.exports = {
    createUser,
    loginUser,
};