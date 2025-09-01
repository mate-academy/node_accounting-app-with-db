'use strict';

const AppError = require('../errors/AppError');
const {
  models: { User },
} = require('../models/models');

const getAllUsers = () => User.findAll();

const getUserById = async (id) => {
  if (isNaN(Number(id))) {
    throw new AppError(400, 'Invalid user ID');
  }

  const user = await User.findByPk(id);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user;
};

const createUser = async ({ name }) => {
  if (!name || !name.trim()) {
    throw new AppError(400, 'Name is required');
  }

  return User.create({ name: name.trim() });
};

const updateUser = async (id, { name }) => {
  if (!name || !name.trim()) {
    throw new AppError(400, 'Name is required');
  }

  const user = await getUserById(id);

  user.name = name.trim();
  await user.save();

  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);

  await user.destroy();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
