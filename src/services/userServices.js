'use strict';

const User = require('../models/user');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = (id) => {
  return User.findOne({ where: { id } });
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = (id) => {
  return User.destroy({ where: { id } });
};

const update = async(id, name) => {
  const user = await User.findOne({ where: { id } });

  if (user) {
    user.name = name;
    await user.save();
  }

  return user;
};

module.exports = {
  getAll,
  getUserById,
  create,
  remove,
  update,
};
