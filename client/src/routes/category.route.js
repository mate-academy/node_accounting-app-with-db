import express from 'express';
import * as categoryController from '../controllers/category.controller.js';

export const categoryRouter = express.Router();
categoryRouter.get('/', categoryController.get);
categoryRouter.post('/', categoryController.create);
categoryRouter.get('/:id', categoryController.getOne);
categoryRouter.patch('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.remove);
