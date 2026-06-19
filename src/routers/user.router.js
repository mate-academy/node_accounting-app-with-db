const { Router } = require('express');
const { userController } = require('../controllers/controllers');

const userRouter = Router();

userRouter.get(`/`, userController.getAll);
userRouter.get(`/:id`, userController.getSingle);
userRouter.post(`/`, userController.create);
userRouter.delete(`/:id`, userController.remove);
userRouter.patch(`/:id`, userController.update);

module.exports = {
  userRouter,
};
