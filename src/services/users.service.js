const { User } = require('../models/User.model');

const getUsers = async () => {
  return User.findAll();
};

const getUser = async (id) => {
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
  return User.destroy({ where: { id } });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
