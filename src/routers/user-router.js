const { Router } = require('express');
const {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require('../controllers/user-controller');

const userRouter = Router();

userRouter
  .route('/users')
  .post(createUserController)
  .get(getAllUsersController);

userRouter
  .route('/users/:id')
  .get(getUserByIdController)
  .patch(updateUserController)
  .delete(deleteUserController);

module.exports = { userRouter };
