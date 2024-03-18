'use strict';

const {
  models: { User },
} = require('../models/models');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  const result = await User.findByPk(id);

  return result;
};

const create = async (name) => {
  const result = await User.create({ name });

  return result;
};

const update = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
