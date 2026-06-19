const { models } = require('../models/models');
const { Category } = models;

const getCategories = () => Category.findAll();

const createCategory = (name) => Category.create({ name });

const getCategoryById = (id) => Category.findByPk(id);

const updateCategoryById = async (id, name) => {
  await Category.update({ name }, { where: { id } });

  return Category.findByPk(id);
};

const getCategoryByName = async (name) => {
  return Category.findOne({ where: { name } });
};

const deleteCategoryById = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    return null;
  }

  await category.destroy();

  return category;
};

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoryByName,
};
