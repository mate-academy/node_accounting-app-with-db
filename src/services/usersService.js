'use strict';

const { models } = require('../models/models');
const { User } = models;

const getUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const deleteUserById = async (id) => {
  await User.destroy({ where: { id } });
};

const updateUserById = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return getUserById(id);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
