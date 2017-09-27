const { 
  userNew, 
  userGetById, 
  userFindOne 
} = require('../domain/user/userMethods');

const { validNewUser, validLoginUser } = require('../validation/userValidation');

const { passwordMatch } = require('../utils/passwordHash');

const safeUser = (user) => {
  const safe = user.toObject();
  delete safe.password;
  return safe;
}

const createUser = async (user) => {
  const invalidUser = validNewUser(user);
  if (!invalidUser) {
    const existingUser = await userFindOne({ email: user.email })
    if (!existingUser) {
      const newUser = await userNew(user);
      return safeUser(newUser);
    }
    return { error: { message: 'User already exists' } };
  };
  return { error: { message: invalidUser } };
};

const loginUser = async (user) => {
  const invalidUser = validLoginUser(user);
  if (!invalidUser) {
    const dbUser = await userFindOne({ email: user.email });
    if (dbUser)  {
      const validPassword = await passwordMatch(user.password, dbUser.password);
      if (validPassword) {
        return safeUser(dbUser);
      }
      return { error: { message: 'Password incorrect' } };
    }
    return { error: { message: 'User not found' } }
  }
  return { error: { message: invalidUser } };
};

module.exports = {
  createUser,
  loginUser
};