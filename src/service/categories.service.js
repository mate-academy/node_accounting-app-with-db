'use strict';

const { Category } = require('./../models/Categories.model');

const getAllCategories = () => {
  return Category.findAll();
};

const getCategoryById = (id) => {
  return Category.findByPk(id);
};

const createCategory = (name) => {
  return Category.create({ name });
};

const deleteCategory = (id) => {
  return Category.destroy({ where: { id } });
};

const updateCategory = (id, payload) => {
  return Category.update(payload, { where: { id } });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
