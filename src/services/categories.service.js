const { Category } = require('../models/Category.model.js');

const getAllCategories = async () => {
  return Category.findAll({
    attributes: ['id', 'name'],
  });
};

const getCategoryById = async (id) => {
  return Category.findByPk(id, {
    attributes: ['id', 'name'],
  });
};

const createCategory = async (name) => {
  return Category.create({ name });
};

const updateCategory = async (id, name) => {
  return Category.update({ name }, { where: { id } });
};

const deleteCategory = async (id) => {
  return Category.destroy({ where: { id } });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
