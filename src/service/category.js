const { Category } = require('./../models/Category.model');

const getAllCategories = async () => {
  return Category.findAll();
};

const getCategoryById = async (id) => {
  return Category.findByPk(id);
};

const createCategory = async (name) => {
  return Category.create({ name });
};

const updateCategory = async (id, data) => {
  return Category.update(data, { where: { id } });
};

const deleteCategory = async (id) => {
  await Category.destroy({ where: { id } });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
