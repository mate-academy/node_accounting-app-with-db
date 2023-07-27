'use strict';

const User = require('../models/user');

let users = [];

const init = () => {
  users = [];
};

const getAll = () => {
  return User.findAll();
};

const getUserById = (id) => {
  return User.findOne({ where: { id } });
};

const create = (name) => {
  return User.create({ name });
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
  init,
  getAll,
  getUserById,
  create,
  remove,
  update,
};
