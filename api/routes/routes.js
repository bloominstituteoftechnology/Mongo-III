const express = require('express');
const UserModel = require('../models/userModels'); //mongoose instance
const userRouter = express.Router();

module.exports = (userRouter) => {

    userRouter.get('/', (req, res) => {
        UserModel.find({})
            .then(user => res.status(200).send(user))
            .catch(err => res.status(400).send({
                error: `The information could not be reached. ${err}`
            }));
    });

    userRouter.post('/new-user', (req, res) => {
        const user = new UserModel(req.body);
        user.save()
            .then(usr => res.status(201).send(usr))
            .catch(err => {
                res.status(500).send({ error: "Something went wrong saving your user information", info: err});
            });
    });

};
