const userService = require('../services/user.service');
const nameCheck = (name, res) => {
  if (!name || typeof name !== 'string') {
    res
      .status(400)
      .send('Invalid request: "name" is required and must be a string.');

    return true;
  }

  return false;
};

const isUserExist = async (id, res) => {
  if (!(await userService.getById(id))) {
    res.status(404).send('User with this id not found');

    return true;
  }

  return false;
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
