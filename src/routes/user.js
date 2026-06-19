const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.patch);

module.exports = userRouter;
