const { Category } = require('../models/Category.model');

const getAll = async () => {
  const result = await Category.findAll();

  return result;
};

const getById = async (id) => {
  const result = await Category.findByPk(id);

  return result;
};

const create = async (name) => {
  const category = await Category.create({ name });

  return category;
};

const deleteById = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }
  await category.destroy();

  return category;
};

const update = async ({ id, name }) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  category.name = name;
  await category.save();

  return category;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
