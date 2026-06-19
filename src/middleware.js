const { getUserById } = require('./services/userService.js');

const isValidDate = (userId) => {
  return getUserById(userId);
};

module.exports = {
  isValidDate,
};
