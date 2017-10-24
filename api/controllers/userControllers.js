const User = require("../models/userModels");

const STATUS_USER_ERROR = 422;

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await new User({ username, password }).save();
    return res.json(user);
  } catch (error) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ stack: error.stack, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({ username, password });
    return res.json(user[0]);
  } catch (error) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ stack: error.stack, message: error.message });
  }
};

module.exports = { createUser, loginUser };
