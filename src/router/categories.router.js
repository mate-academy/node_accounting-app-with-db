const express = require('express');
const route = express.Router();
const controllerCategory = require('./../controller/categories.controller.js');

route.get('/', controllerCategory.getAllCategories);
route.get('/:id', controllerCategory.getCategoryById);
route.post('/', controllerCategory.createCategory);
route.delete('/:id', controllerCategory.deleteCategory);
route.patch('/:id', controllerCategory.updateCategory);

module.exports = route;
