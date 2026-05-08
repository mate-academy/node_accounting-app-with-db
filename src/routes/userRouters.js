const express = require('express');
const { isValidId, isValidBody } = require('../middleware/middleware');
const userController = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', isValidId, userController.getUserById);

userRouter.post('/', express.json(), isValidBody, userController.addUser);

userRouter.patch(
  '/:id',
  isValidId,
  express.json(),
  isValidBody,
  userController.updateUser,
);

userRouter.delete('/:id', isValidId, userController.removeUser);

module.exports = userRouter;
