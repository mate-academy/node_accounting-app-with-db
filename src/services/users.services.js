'use strict';

const { User } = require('../models/userModel');

const getAllUsers = () => {
  return User.findAll({
    order: ['createdAt'],
  });
};

const getUserById = (userId) => User.findByPk(Number(userId));

const createUser = (name) => User.create({ name });

const removeUser = (userId) => (
  User.destroy({
    where: {
      id: Number(userId),
    },
  }));

const updateUser = async(userId, name) => {
  await User.update({ name }, {
    where: {
      id: Number(userId),
    },
  });

  return getUserById(Number(userId));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
