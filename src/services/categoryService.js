'use strict';

const {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../dbQueries');

const categoryService = {
  createCategory: async(name) => {
    return createCategory(name);
  },
  getCategoryById: async(id) => {
    return getCategoryById(id);
  },
  updateCategory: async(id, name) => {
    return updateCategory(id, name);
  },
  deleteCategory: async(id) => {
    return deleteCategory(id);
  },
};

module.exports = categoryService;
