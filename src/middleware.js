const { getUserById } = require('./services/userService');

const isValidDate = (userId) => {
  return getUserById(userId);
};

module.exports = {
  isValidDate,
};
