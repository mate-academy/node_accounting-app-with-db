'use strict';

const express = require('express');

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = {
  categoryRouter: router,
};
