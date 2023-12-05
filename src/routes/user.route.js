import express from 'express';
import * as userController from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get('/', userController.get);

userRouter.post('/', express.json(), userController.create);

userRouter.get('/:id', userController.getOne);

userRouter.patch('/:id', express.json(), userController.update);

userRouter.delete('/:id', userController.remove);
