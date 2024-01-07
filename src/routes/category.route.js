'use strict';

const express = require('express');

const { categoryController } = require('../controllers/category.controller.js');

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/', categoryController.create);
categoryRouter.get('/:id', categoryController.getOne);
categoryRouter.delete('/:id', categoryController.remove);
categoryRouter.patch('/:id', categoryController.update);

module.exports = {
  categoryRouter,
};
