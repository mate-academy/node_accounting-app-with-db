'use strict';

const { User } = require('../models/User');

const getAllUsers = () => {
  return User.findAll();
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const removeUser = (id) => {
  return User.destroy({
    where: { id },
  });
};

const updateUser = (id, name) => {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
