'use strict';

const { User } = require('../models/User.model');

const createUserService = async (name) => {
  try {
    const newUser = await User.create({ name });

    return newUser;
  } catch (error) {
    return 'Failed to create user';
  }
};

const getUsersService = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch (error) {
    return 'Failed to get users';
  }
};

const getUserByIdService = async (id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    return 'Failed to get user by ID';
  }
};

const updateUserService = async (id, name) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }
    user.name = name;
    await user.save();

    return user;
  } catch (error) {
    return 'Failed to update user';
  }
};

const deleteUserService = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return false;
    }

    await user.destroy();

    return true;
  } catch (error) {
    return 'Failed to delete user';
  }
};

const initUsers = async () => {
  await User.sync();
};

module.exports = {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  initUsers,
};
