const { User } = require('../models/User.model');

const getAll = async () => {
  const allUsers = await User.findAll();

  return allUsers;
};

const createUser = async (name) => {
  const user = await User.create({ name });

  return user;
};

const getById = async (id) => {
  const user = User.findByPk(id);

  return user;
};

const removeUser = async (id) => {
  await User.destroy({ where: { id } });
};

const updateUserById = async (id, name) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  getById,
  createUser,
  removeUser,
  updateUserById,
};
