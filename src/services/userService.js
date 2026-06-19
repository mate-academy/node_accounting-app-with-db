'use strict';

const {
  models: { User },
} = require('../models/models');

const getAll = async () => {
  const users = await User.findAll();

  return users.map((user) => user.toJSON());
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user ? user.toJSON() : null;
};

const create = async (name) => {
  const user = await User.create({ name });

  return user.toJSON();
};

const update = async (id, name) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.update({ name });

  return user.toJSON();
};

const remove = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return false;
  }

  await user.destroy();

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
