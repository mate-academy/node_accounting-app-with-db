const userService = require('../services/usersService');

const isNameValid = (name) => {
  return !name || typeof name !== 'string';
};

const isUserExist = async (id) => {
  return !(await userService.getById(id));
};

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

module.exports = {
  isNameValid,
  isUserExist,
  normalize,
};
