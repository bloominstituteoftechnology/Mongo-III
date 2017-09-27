const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
  return hash;
}

const passwordMatch = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
}

module.exports = {
  hashPassword,
  passwordMatch
}
