const express = require('express');

const userModels = require('../models/userModels.js');

const userRouter = express.Router();

// POST '/new-user'
const newUser = (req, res) => {
    const userInfo = req.body;
    const user = new userModels(userInfo);

    if (!user || !user.password) {
        res.status(400).json(`Your username or password is not defined.`)
    }
    user
    .save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while creating a user.` });
    })
}
// POST '/login'
const newLogin = (req, res) => {
    const userInfo = req.body;
    const user = user.find()
    user
    .save()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ error: `There was an error while logging in.` });
    })
}

module.exports = { userRouter, newUser, newLogin };

