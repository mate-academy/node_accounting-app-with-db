const usersServices = require('../services/users.services');

const isUserExist = (userId) => {
  return !isNaN(userId) && !!usersServices.getUserById(userId);
};

module.exports = { isUserExist };
