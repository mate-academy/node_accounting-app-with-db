import express from 'express';
import * as userController from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.get('/', userController.get);

userRouter.get('/:id', userController.getOne);

userRouter.post('/', userController.create);

userRouter.patch('/:id', userController.update);

userRouter.delete('/:id', userController.remove);
