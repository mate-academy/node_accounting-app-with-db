import * as userController from '../controllers/usersController.js';
import express from 'express';

export const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUser);

router.post('/', userController.createUser);

router.delete('/:userId', userController.removeUser);

router.patch('/:userId', userController.updateUser);
