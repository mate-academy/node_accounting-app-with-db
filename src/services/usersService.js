'use strict';

const { User } = require('../models/userModel');

const getAllUsers = async() => {
  return User.findAll({
    order: [
      'id',
    ],
  });
};

const getUserById = (userId) => {
  return User.findByPk(Number(userId));
};

const createUser = (name) => {
  return User.create({ name });
};

const removeUser = (userId) => {
  return User.destroy({
    where: { id: userId },
  });
};

const updateUser = (userId, name) => {
  return User.update({ name }, {
    where: { id: Number(userId) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
