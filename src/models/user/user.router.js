
import { Router } from 'express';
import { getAll, getById, remove, create, update } from './user.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.delete('/:id', remove);
router.post('/', create);
router.patch('/:id', update);

export default router;
