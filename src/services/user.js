'use strict';

const User = require('../models/user');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getOne = async(userId) => {
  const user = await User.findByPk(userId);

  return user;
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const deleteOne = async(userId) => {
  const userToDelete = await User.destroy({
    where: { id: userId },
  });

  return userToDelete;
};

const updateOne = async(userId, name) => {
  const userToUpdate = await User.update({ name }, {
    where: { id: userId },
  });

  return userToUpdate;
};

module.exports = {
  getAll, getOne, create, deleteOne, updateOne,
};
