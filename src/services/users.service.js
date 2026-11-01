'use strict';

const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async (name) => {
  return User.create({ name });
};

const update = async (id, name) => {
  const user = await getById(id);

  if (!user) {
    return null;
  }

  return user.update({ name });
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
