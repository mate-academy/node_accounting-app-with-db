'use strict';

const User = require('../models/user');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = async(userId) => {
  return User.findByPk(userId);
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = (id) => {
  return User.destroy({ where: { id } });
};

const update = async(userId, name) => {
  const user = await User.findByPk(userId);

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
  update,
  remove,
};
