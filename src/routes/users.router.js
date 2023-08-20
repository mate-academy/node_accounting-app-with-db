import { Router } from 'express';
import * as usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);

router.post('/', usersController.createUser);
router.patch('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

export { router };
