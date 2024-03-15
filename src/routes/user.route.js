'use strict';

const express = require('express');
const userConroller = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', userConroller.get);
userRouter.get('/:id', userConroller.getOne);
userRouter.post('/', userConroller.create);
userRouter.delete('/:id', userConroller.remove);
userRouter.patch('/:id', userConroller.update);

module.exports = { userRouter };
