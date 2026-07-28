'use strict';

const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (data) => {
  const { name } = data || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    const error = new Error('Name is required');

    error.status = 400;
    throw error;
  }

  return User.create({ name: name.trim() });
};

const update = async (id, body) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  const { name } = body || {};

  if (name !== undefined) {
    if (!name || typeof name !== 'string' || !name.trim()) {
      const error = new Error('Name cannot be empty');

      error.status = 400;
      throw error;
    }
    user.name = name.trim();
  }

  await user.save({ silent: true });

  return user;
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
