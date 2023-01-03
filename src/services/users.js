'use strict';

const { findMaxId } = require('../utils');

let initialUsers = [];

const getAllUsers = () => initialUsers;

const getUserById = (userId) => initialUsers.find(({ id }) => (
  userId === id
)) || null;

const createUser = (name) => {
  const newUser = {
    name,
    id: findMaxId(initialUsers) + 1,
  };

  initialUsers.push(newUser);

  return newUser;
};

const removeUser = (userId) => {
  initialUsers = initialUsers.filter(({ id }) => id !== userId);
};

const updateUser = (userId, name) => {
  const user = getUserById(userId);

  Object.assign(user, { name });

  return user;
};

const resetUsers = () => {
  initialUsers = [];
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  resetUsers,
};
