'use strict';

const { User } = require('../models/users');

const getAll = () => {
  return User.findAll({
    order: [
      'created_at',
    ],
  });
};

const getUserById = (userId) => {
  return User.findByPk(userId);
};

const addUser = (name) => {
  return User.create({ name });
};

const removeUser = (userId) => {
  User.destroy({
    where: {
      id: userId,
    },
  });
};

const updateUser = async(userId, name) => {
  return User.update({ name }, {
    where: {
      id: userId,
    },
  });
};

module.exports = {
  getAll,
  getUserById,
  addUser,
  removeUser,
  updateUser,
};
