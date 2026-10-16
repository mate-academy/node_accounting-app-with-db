'use strict';

const {
  models: { User },
} = require('../models/models');

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (user) => {
  return User.create({ ...user });
};

const update = async ({ id, name }) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  return user.update({ name });
};

const remove = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }
  await user.destroy();

  return user;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
