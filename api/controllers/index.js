const userControllers = require('./userControllers');
const postControllers = require('./postControllers');

module.exports = { ...userControllers, ...postControllers };
