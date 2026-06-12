const { Category } = require('../models/Category.model');

async function getAllCategories() {
  return Category.findAll();
}

async function createCategory(name) {
  return Category.create({ name });
}

async function getCategoryById(id) {
  return Category.findByPk(id);
}

async function deleteCategory(id) {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  await category.destroy();

  return true;
}

async function updateCategory(id, data) {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  if (!data.name) {
    return null;
  }

  category.name = data.name;

  await category.save();

  return category;
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
