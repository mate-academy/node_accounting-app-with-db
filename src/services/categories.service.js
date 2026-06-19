'use strict';

const { Category } = require('../models/Category.model');

const getAll = async () => {
  return Category.findAll();
};

const create = async ({ name }) => {
  return Category.create({ name });
};

const getById = async (id) => {
  return Category.findByPk(id);
};

const remove = async (id) => {
  await Category.destroy({ where: { id } });
};

const update = async ({ id, name }) => {
  return Category.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
