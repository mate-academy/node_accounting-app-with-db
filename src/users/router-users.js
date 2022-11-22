'use strict';

import express from 'express';
import * as userControllers from './controllers-users.js';

export const userRouter = express.Router();

userRouter.get('/users', userControllers.getAll);

userRouter.get('/users/:userId', userControllers.getUser);

userRouter.post('/users', userControllers.createUser);

userRouter.delete('/users/:userId', userControllers.deleteUser);

userRouter.patch('/users/:userId', userControllers.updateUser);

