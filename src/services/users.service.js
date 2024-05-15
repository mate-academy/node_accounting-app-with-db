const { User } = require('../models/User.model');
const getId = require('../utils/createMaxId');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAllUsers = async () => {
  const getUsers = await User.findAll();

  return getUsers;
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  const users = await User.findAll();
  const id = getId.createMaxId(users);

  return User.create({ id, name });
};

const removeUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  normalize,
};
