const {
  models: { User },
} = require('../models/models');

const createUser = async (name) => {
  return User.create({ name });
};

const getUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const deleteUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.destroy();

  return user;
};

const updateUserById = async (id, name) => {
  await User.update({ name }, { where: { id } });

  const updatedUser = await User.findByPk(id);

  return updatedUser;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
};
