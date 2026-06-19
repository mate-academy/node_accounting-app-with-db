const express = require('express');
const usersController = require('../controllers/usersController.js');
const userRouter = express.Router();

userRouter.get('/', usersController.get);

userRouter.get('/:id', usersController.getOne);

userRouter.post('/', usersController.create);

userRouter.delete('/:id', usersController.remove);

userRouter.patch('/:id', usersController.update);

module.exports = { userRouter };
