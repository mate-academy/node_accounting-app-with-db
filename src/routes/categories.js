'use strict';

const express = require('express');
const router = express.Router();
const { categoriesController } = require('../controllers/categories');

router.get('/', categoriesController.getAll);
router.get('/:categoryId', categoriesController.getOne);
router.post('/', categoriesController.add);
router.delete('/:categoryId', categoriesController.remove);
router.patch('/:categoryId', categoriesController.update);

module.exports = router;
