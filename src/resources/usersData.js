const users = [];
let userCount = 1;

const resetUsers = () => {
  users.length = 0;
  userCount = 1;
};

const getUserCount = () => {
  return userCount;
};

const incrementCount = () => {
  userCount++;
};

module.exports = {
  users,
  userCount: getUserCount,
  resetUsers,
  incrementCount,
};
