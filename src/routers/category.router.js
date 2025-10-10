const { Router } = require('express');
const { categoryController } = require('../controllers/controllers');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getSingle);

module.exports = {
  categoryRouter,
};
