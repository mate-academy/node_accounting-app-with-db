'use strict';

const { Category } = require('../models/category');

const getCategories = async() => Category.findAll();

const getCategory = async(categoryId) => {
  return Category.findByPk(categoryId);
};

const createCategory = async(name) => {
  return Category.create({
    name,
  });
};

const updateCategory = ({ id, name }) => {
  return Category.update({ name }, {
    where: {
      id: id,
    },
  });
};

const deleteCategory = (categoryId) => {
  return Category.destroy({
    where: {
      id: categoryId,
    },
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
