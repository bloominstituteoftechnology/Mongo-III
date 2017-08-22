// const mongoose = require('mongoose');
// const User = mongoose.model('../models/userModels');
// const bodyParser = require('body-parser');
//
// const STATUS_USER_ERROR = 422;
//
//
// const login = (req, res) => {
//   const { userName, password } = req.body;
//   // log in
// }
//
// const createUser = (req, res) => {
//     const { userName, password } = req.body;
//     const newUser = new User({ userName, password });
//     newUser.save()
//       .then((err, user) => {
//           res.json(user);
//       })
//       .catch((err) => {
//           res.status(STATUS_USER_ERROR);
//           res.json({ stack: err.stack, message: err.message });
//       });
// }
//
//
// module.exports = {
//     createUser,
//     /* listUsers,
//     findUser,
//     deleteUser */
// };
