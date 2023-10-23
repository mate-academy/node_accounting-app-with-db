'use strict';

const {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../dbQueries');

const createCategoryService = async(name) => {
  return createCategory(name);
};

const getCategoryByIdService = async(id) => {
  return getCategoryById(id);
};

const updateCategoryService = async(id, name) => {
  return updateCategory(id, name);
};

const deleteCategoryService = async(id) => {
  return deleteCategory(id);
};

module.exports = {
  createCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
};

// let currentCategoryId = 0;

// const createCategory = (categories, name) => {
//   currentCategoryId++;

//   const newCategory = {
//     id: currentCategoryId,
//     name,
//   };

//   categories.push(newCategory);

//   return newCategory;
// };

// const getCategoryById = (categories, id) => {
//   return categories.find(c => c.id === parseInt(id));
// };

// const updateCategory = (categories, id, name) => {
//   const category = categories.find(c => c.id === parseInt(id));

//   if (category && name) {
//     category.name = name;

//     return category;
//   }

//   return null;
// };

// const deleteCategory = (categories, categoryId) => {
//   const index = categories.findIndex(c => c.id === categoryId);

//   if (index === -1) {
//     return null;
//   }

//   categories.splice(index, 1);

//   return true;
// };

// module.exports = {
//   createCategory,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
// };
