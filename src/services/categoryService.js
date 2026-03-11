'use strict';

const {
  models: { Category },
} = require('../models/models');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories.map((c) => c.toJSON());
};

const getById = async (id) => {
  const category = await Category.findByPk(id);

  return category ? category.toJSON() : null;
};

const create = async (name) => {
  const category = await Category.create({ name });

  return category.toJSON();
};

const update = async (id, name) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  await category.update({ name });

  return category.toJSON();
};

const remove = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return false;
  }

  await category.destroy();

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
