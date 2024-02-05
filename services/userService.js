/* eslint-disable no-console */
'use strict';

const { models } = require('../src/models/models');

const getAllUsers = async() => {
  return models.User.findAll({
    order: [
      ['id'],
    ],
  });
};

const getUserById = async(userID) => {
  return models.User.findByPk(userID);
};

const createUser = async(name) => {
  return models.User.create({ name });
};

const deleteUser = async(userID) => {
  const result = await models.User.destroy({
    where: {
      id: userID,
    },
  });

  if (result !== 1) {
    return null;
  }

  return true;
};

const updateUser = async(userID, name) => {
  const [status, updatedRows] = await models.User.update({ name }, {
    where: {
      id: userID,
    },
    returning: ['id', 'name'],
  });

  if (status !== 1) {
    return null;
  }

  return updatedRows[0];
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  createUser,
};
