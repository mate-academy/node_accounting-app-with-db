'use strict';

const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return { id, name };
};

const getAllUsers = async () => {
  const usersData = await User.findAll();

  return usersData;
};

const findUserService = async (id) => {
  return User.findByPk(id);
};

const createUserService = (name) => {
  const allUsers = getAllUsers();
  const newUser = {
    name,
    id: allUsers.length + 1,
  };

  return User.create(newUser);
};

const deleteUserService = (userId) => {
  // users = users.filter((user) => user.id !== +userId);
};

module.exports = {
  findUserService,
  createUserService,
  deleteUserService,
  getAllUsers,
  normalize,
};
