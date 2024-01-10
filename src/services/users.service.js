'use strict';

const { userModel } = require('../models/userModel');

const getAllUsers = async() => {
  const users = await userModel.findAll();

  return users;
};

const getUserById = (id) => userModel.findByPk(id);

const addNewUser = async(name) => {
  const newUser = await userModel.create(name);

  return newUser;
};

const removeUser = (id) => {
  userModel.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async(id, name) => {
  await userModel.update({
    name,
  }, {
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  removeUser,
  updateUser,
};
