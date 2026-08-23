const express = require('express');
const categoryController = require('../controllers/category.controller.js');

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.get);
categoryRouter.post('/', categoryController.create);
categoryRouter.get('/:id', categoryController.getOne);
categoryRouter.patch('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.remove);
module.exports = categoryRouter;
