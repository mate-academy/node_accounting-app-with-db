const { Router } = require('express');
const categoryController = require('../controllers/categoryController.js');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllController);
categoryRouter.get('/:id', categoryController.getByIdController);
categoryRouter.post('/', categoryController.createController);
categoryRouter.delete('/:id', categoryController.deleteOneController);
categoryRouter.patch('/:id', categoryController.updateController);

module.exports = { categoryRouter };
