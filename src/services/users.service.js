'use strict';

const User = require('../models/user.model');

const getAllUsers = async() => {
  return User.findAll();
};

const getUsersById = async(id) => {
  return User.findByPk(id);
};

const createUser = async(name) => {
  const user = {
    name,
  };

  return User.create(user);
};

const removeUser = async(id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async({ id, name }) => {
  return User.update({ name }, { where: { id } });
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  removeUser,
  updateUser,
};
