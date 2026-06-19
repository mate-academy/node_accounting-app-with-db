const { Category } = require('../models/models.js');

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);

  return category;
};

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });

  return newCategory;
};

const updateCategory = async (id, name) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }
  category.name = name;
  await category.save();

  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }
  await category.destroy();

  return category;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
