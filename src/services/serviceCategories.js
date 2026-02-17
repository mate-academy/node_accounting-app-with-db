'use strict';

const { Category } = require('../models/Category.model');

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(Number(id));

  return category;
};

const createCategory = async (name) => {
  const category = await Category.create({ name });

  return category;
};

const updateCategory = async (id, name) => {
  const category = await getCategoryById(id);

  if (!category) {
    return null;
  }

  await category.update({ name });

  return category;
};

const deleteCategory = async (id) => {
  const category = await getCategoryById(id);

  if (!category) {
    return false;
  }

  await category.destroy();

  return true;
};

const clearCategories = async () => {
  await Category.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  clearCategories,
};
