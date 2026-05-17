const { User } = require('../models/User.model.js');

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUser = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const removeUser = async (id) => {
  const userToRemove = await getUser(id);

  await User.destroy({ where: { id } });

  return userToRemove;
};

const editUser = async (id, name) => {
  const user = await getUser(id);

  const updatedUser = await user.update({ name });

  return updatedUser;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  editUser,
};
