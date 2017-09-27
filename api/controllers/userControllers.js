const mongoose = require('mongoose'); 

const User = require('user');

const STATUS_USER_ERROR = 422;

const newUser = (res,req) => {
    const { username, password } = req.body;
    const createUser = { username, password };
    const user = new User(createUser);
user.save((err, newUser) => {
    if (err) {
        res.status(STATUS_USER_ERROR);
        res.send({'Error: no user input' : err.message});
        return;
    }
    res.json(newUser);
});
}

const userLogin = (req, res) => {
    const { username, password } = req.body;
    const loginInfo = { username, password};
    user.findOne(loginInfo, (err, user) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.send({'Error: no user found' : err.message});
            return;
        }
        res.json(user);
    });
        
}


module.exports = {
    newUser, 
    userLogin
}

