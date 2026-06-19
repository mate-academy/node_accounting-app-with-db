const { Category } = require('../models/Category.model');

async function getAll() {
  const categories = await Category.findAll();

  return categories;
}

async function getById(id) {
  const category = await Category.findByPk(id);

  return category;
}

async function create({ name }) {
  const category = await Category.create({ name });

  return category;
}

async function update(id, { name }) {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  category.name = name;

  await category.save();

  return category;
}

async function deleteById(id) {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  await category.destroy();

  return category;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
