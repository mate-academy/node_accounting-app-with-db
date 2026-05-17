const { models } = require('../models/models');
const { Category } = models;

async function getAll() {
  return Category.findAll({
    order: [['title', 'ASC']],
  });
}

async function create(title) {
  if (!title || typeof title !== 'string') {
    const error = new Error('Title is required and must be a string');

    error.code = 400;
    throw error;
  }

  const newCategory = await Category.create({ title });

  return newCategory;
}

async function getById(id) {
  return Category.findByPk(id);
}

async function update(id, title) {
  const category = await Category.findByPk(id);

  if (!category) {
    const error = new Error('Category not found');

    error.code = 404;
    throw error;
  }

  if (!title || typeof title !== 'string') {
    const error = new Error('Title must be a string');

    error.code = 400;
    throw error;
  }

  await category.update({ title });

  return category;
}

async function remove(id) {
  const deletedRows = await Category.destroy({
    where: { id },
  });

  return deletedRows > 0;
}

async function reset() {
  await Category.destroy({ truncate: true, where: {} });
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  reset,
};
