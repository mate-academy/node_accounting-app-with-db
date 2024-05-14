const userService = require('../services/user.service');
const nameCheck = (name) => {
  if (!name || typeof name !== 'string') {
    return true;
  }
};

const isUserExist = async (id) => {
  if (!(await userService.getById(id))) {
    return true;
  }
};

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

module.exports = {
  nameCheck,
  isUserExist,
  normalize,
};
