const express = require('express');
const categoryRoutes = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRoutes.get('/', (req, res) => {
  categoryController.getCategories(req, res);
});

categoryRoutes.post('/', (req, res) => {
  categoryController.createCategory(req, res);
});

categoryRoutes.get('/:id', (req, res) => {
  categoryController.getCategoryById(req, res);
});

categoryRoutes.patch('/:id', (req, res) => {
  categoryController.updateCategory(req, res);
});

categoryRoutes.delete('/:id', (req, res) => {
  categoryController.deleteCategory(req, res);
});

module.exports = categoryRoutes;
