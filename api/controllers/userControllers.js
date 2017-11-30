const User = require('../models/userModels');

const UserController = {
    createUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = new User({ username, password });
            const saved = await user.save();
            res.json(saved);
        } catch (error) {
            console.log('error: ', error.message);
            res.status(422).json({ error });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username, password}).exec();
            return user ? res.json(user): res.status(422).json({ error: 'User not found'})
        } catch (error) {
            console.log('error: ', error.message);
            res.status(422).json({ error });            
        }
    }
};

module.exports = UserController