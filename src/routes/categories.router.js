import { Router } from 'express';
import * as categoriesController from '../controllers/categories.controller.js';

const router = Router();

router.get('/', categoriesController.getAllCategories);

router.get('/:categoryId', categoriesController.getCategoryById);

router.post('/', categoriesController.createCategory);
router.patch('/:categoryId', categoriesController.updateCategory);
router.delete('/:categoryId', categoriesController.deleteCategory);

export { router };
