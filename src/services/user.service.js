// src/services/user.service.js

'use strict';

const { models } = require('../models/models');
const { User } = models;
const { UniqueConstraintError } = require('sequelize');

const getUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']],
  });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (name) => {
  try {
    const newUser = await User.create({ name });

    return newUser;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new Error('User with this name already exists');
    }
    throw error;
  }
};

const updateUser = async (id, name) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  try {
    user.name = name;
    await user.save();

    return user;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new Error('User with this name already exists');
    }
    throw error;
  }
};

const deleteUser = async (id) => {
  const deletedCount = await User.destroy({
    where: { id },
  });

  return deletedCount > 0;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
