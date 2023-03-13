'use strict';

const categoryController = require('../controllers/categories');
const express = require('express');

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:categoryId', categoryController.getOne);

router.post('/', categoryController.add);
router.patch('/:categoryId', categoryController.update);
router.delete('/:categoryId', categoryController.remove);

module.exports = {
  router,
};
