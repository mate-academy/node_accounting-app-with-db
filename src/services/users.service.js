'use strict';

const { User } = require('../models/User.model');

const getAllUsersService = async () => {
  const usersData = await User.findAll();

  return usersData;
};

const findUserService = async (id) => {
  return User.findByPk(id);
};

const createUserService = async (name) => {
  const newUserr = await User.create({ name });

  return newUserr;
};

const updateUserService = async (id, name) => {
  await User.update({ name }, { where: { id } });
};

const deleteUserService = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  findUserService,
  createUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
};
