import express from 'express';

import * as userController from '../controllers/users.js';

export const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getOne);
router.post('/', express.json(), userController.add);
router.delete('/:userId', userController.remove);
router.patch('/:userId', express.json(), userController.update);
