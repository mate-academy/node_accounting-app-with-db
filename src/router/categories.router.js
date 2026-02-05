'use strict';

const express = require('express');
const controller = require('../controller/categories.controller');

const router = express.Router();

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.createCategory);
router.delete('/:id', controller.deleteCategory);
router.patch('/:id', controller.updateCategory);

module.exports = router;
