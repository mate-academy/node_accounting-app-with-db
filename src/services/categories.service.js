/* eslint-disable no-return-await */
const { Category } = require('../models/Category.model.js');

const getCategories = async () => {
  return await Category.findAll();
};

const getCategory = async (id) => {
  return await Category.findByPk(id);
};

const createCategory = async (name) => {
  return await Category.create({ name });
};

const updateCategory = async ({ id, name }) => {
  await Category.update({ name }, { where: { id } });

  return await Category.findByPk(id);
};

const deleteCategory = async (id) => {
  return await Category.destroy({ where: { id } });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
