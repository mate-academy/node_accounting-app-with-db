'use strict';

const { User } = require('../utils/models/User');

const getAllUsers = () => {
  return User.findAll();
};

const addUser = (name) => {
  return User.create({ name });
};

const getUserById = (userId) => {
  return User.findByPk(userId);
};

const deleteUser = (userId) => {
  return User.destroy({
    where: {
      id: userId,
    },
  });
};

const changeUser = async(userId, name) => {
  const foundedUser = await User.findByPk(userId);

  await foundedUser.update({ name });

  return foundedUser.save();
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  changeUser,
};
