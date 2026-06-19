const { Category } = require('../models/Category.model');

const getCategoryById = async (id) => {
  return Category.findByPk(id);
};

const getAllCategories = async () => {
  return Category.findAll({ order: [['name', 'ASC']] });
};

const createCategory = async (categoryData) => {
  return Category.create(categoryData);
};

const removeCategory = async (id) => {
  return Category.destroy({ where: { id } });
};

const updateCategory = async (id, categoryData) => {
  await Category.update(categoryData, { where: { id } });

  return getCategoryById(id);
};

module.exports = {
  getCategoryById,
  getAllCategories,
  createCategory,
  removeCategory,
  updateCategory,
};
