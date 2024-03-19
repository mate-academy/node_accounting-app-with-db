'use strict';

const express = require('express');
const cors = require('cors');
const userController = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.use(cors());
userRouter.use(express.json());

userRouter.get('/', userController.getAll);

userRouter.get('/:id', userController.get);

userRouter.post('/', userController.create);

userRouter.delete('/:id', userController.remove);

userRouter.patch('/:id', userController.update);

module.exports = {
  userRouter,
};
