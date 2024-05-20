const { User } = require('../models/User.model');

const getUsersData = async () => {
  return User.findAll();
};

const getOneUserData = async (id) => {
  return User.findByPk(id);
};

const addUser = async (newUser) => {
  return User.create(newUser);
};

const removeUser = async (id) => {
  await User.destroy({ where: { id } });

  return getUsersData();
};

const updateUserData = async (userId, newName) => {
  await User.update({ name: newName }, { where: { id: userId } });

  return getOneUserData(userId);
};

module.exports = {
  getUsersData,
  getOneUserData,
  addUser,
  removeUser,
  updateUserData,
};
