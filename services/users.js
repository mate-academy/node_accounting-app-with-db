/* eslint-disable space-before-function-paren */
'use strict';

const { User } = require('../models');

const getAll = () => User.findAll();

const getUserById = (userId) => {
  return User.findByPk({ id: userId });
};

const createUser = async (name) => {
  const user = await User.create({ name });

  return user;
};

const updateUser = async ({ userId, name }) => {
  await User.update({ name }, {
    where: {
      id: userId,
    },
  });
};

const removeUser = async (userId) => {
  await User.destroy({ where: { id: userId } });
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
