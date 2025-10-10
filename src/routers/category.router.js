const { Router } = require('express');
const { categoryController } = require('../controllers/controllers');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getSingle);
categoryRouter.post('/', categoryController.create);
categoryRouter.delete('/:id', categoryController.remove);
categoryRouter.patch('/:id', categoryController.update);

module.exports = {
  categoryRouter,
};
