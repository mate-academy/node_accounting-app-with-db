'use strict';

const { models: { User } } = require('../models/models');

const USER_NOT_FOUND_ERROR = 'User doesn\'t exist';

const init = async() => {
  await User.destroy({
    where: {},
    truncate: true,
  });
};

const getUsers = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = async(id) => {
  const searchUser = await User.findOne({ where: { id } });

  if (!searchUser) {
    throw new Error(USER_NOT_FOUND_ERROR);
  }

  return searchUser;
};

const createUser = async(name) => {
  const user = {
    name,
  };

  const createdUser = await User.create(user);

  return createdUser;
};

const deleteUser = async(id) => {
  const userToDelete = await getUserById(id);

  if (!userToDelete) {
    throw new Error(USER_NOT_FOUND_ERROR);
  }

  await userToDelete.destroy();
};

const changeUser = async(name, id) => {
  const userToChange = await getUserById(id);

  if (!userToChange) {
    throw new Error(USER_NOT_FOUND_ERROR);
  }

  userToChange.name = name;
  await userToChange.save();

  return userToChange;
};

module.exports = {
  changeUser,
  deleteUser,
  getUsers,
  getUserById,
  createUser,
  init,
};
