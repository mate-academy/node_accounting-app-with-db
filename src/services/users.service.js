const {
  models: { User },
} = require('../models/models');

const allUsers = async () => {
  return User.findAll();
};

const userById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

const resetAllUsers = async () => {
  await User.sync();
};

module.exports = {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
  resetAllUsers,
};
