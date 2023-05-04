'use strict';

const { UserModel } = require('../models/userModel.js');
const { sequelize } = require('sequelize');

const getAll = async() => {
  const users = await UserModel.findAll({
    order: [
      'spentAt',
    ],
  });

  return users;
};

const getById = async(userId) => {
  const foundUser = await UserModel.findByPk(userId);

  return foundUser;
};

const addUser = async(name) => {
  const createdUser = await UserModel.create({ name });

  return createdUser;
};

const removeUser = async(userId) => {
  if (!getById(userId)) {
    return false;
  }

  await UserModel.destroy({
    where: {
      id: userId,
    },
  });

  return true;
};

const updateUser = async(userId, name) => {
  if (!getById(userId)) {
    return null;
  }

  const updatedUser = await UserModel.update({ name }, {
    where: {
      id: userId,
    },
  });

  return updatedUser;
};

const reset = async() => {
  const users = await getAll();

  return sequelize.transaction(async(t) => {
    for (const user of users) {
      await removeUser(user.id);
    }
  });
};

module.exports = {
  getAll,
  getById,
  addUser,
  removeUser,
  updateUser,
  reset,
};
