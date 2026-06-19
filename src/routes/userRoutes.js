const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.getAllController);
userRouter.get('/:id', userController.getByIdController);
userRouter.post('/', userController.createController);
userRouter.delete('/:id', userController.deleteOneController);
userRouter.patch('/:id', userController.updateController);

module.exports = { userRouter };
