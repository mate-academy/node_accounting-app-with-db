'use strict';

const User = require('../models/users');

const getUsers = async() => {
  const users = await User.findAll();

  return users;
};

const getUser = async(id) => {
  return User.findOne({ where: { id } });
};

const deleteUser = (id) => {
  return User.destroy({ where: { id } });
};

const addUser = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const updateUser = async(id, name) => {
  const user = await User.findOne({ where: { id } });

  if (user) {
    user.name = name;
    await user.save();
  }

  return user;
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
};
