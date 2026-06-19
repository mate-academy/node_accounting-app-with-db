const express = require('express');
const {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory,
} = require('../controllers/category.controller.js');

const categoryRoutes = express.Router();

categoryRoutes.get('/', getCategories);
categoryRoutes.get('/:id', getCategory);
categoryRoutes.post('/', addCategory);
categoryRoutes.put('/:id', editCategory);
categoryRoutes.delete('/:id', removeCategory);

module.exports = categoryRoutes;
