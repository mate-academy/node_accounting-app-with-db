/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
'use strict';

const { User } = require('../models/User.model');

const clearUsers = () => {
  User.sync({ truncate: true });
};

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const createUser = async (name) => {
  return await User.create({ name });
};

const updateUser = async (id, name) => {
  return await User.update({ name }, { where: { id } });
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  clearUsers,
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
