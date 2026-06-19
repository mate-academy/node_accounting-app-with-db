'use strict';

const express = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = express.Router();

router.get('/', categoriesController.getAll);
router.post('/', categoriesController.create);
router.get('/:id', categoriesController.getById);
router.delete('/:id', categoriesController.remove);
router.patch('/:id', categoriesController.update);

module.exports = router;
