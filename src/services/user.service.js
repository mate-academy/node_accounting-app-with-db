'use strict';

const { User } = require('../models/User.model');

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return getUserById(id);
};

const deleteUser = async (id) => {
  User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
