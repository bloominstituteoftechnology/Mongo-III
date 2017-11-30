const User = require('../models/userModels');

const userCreate = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(savedUser);
    });
};

const userLogin = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password})
    .select('username')
    .exec()
    .then(user => {
        if(user === null){
            throw new Error();
        }
        res.json(user);
    })
    .catch(err => res.status(422).json({error: err.message}));
};

module.exports = {
    userLogin,
    userCreate
};