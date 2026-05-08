'use strict';

const { User } = require('./../models/User.model');

const getAllUsers = () => {
  return User.findAll();
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const deleteUser = (id) => {
  return User.destroy({ where: { id } });
};

const updateUser = (id, data) => {
  return User.update(data, { where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
