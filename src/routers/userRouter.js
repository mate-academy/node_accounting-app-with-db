const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getById);
userRouter.delete('/:id', userController.remove);
userRouter.patch('/:id', userController.update);

module.exports = {
  userRouter,
};
