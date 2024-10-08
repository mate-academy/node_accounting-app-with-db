'use strict';

const userController = require('./../controllers/users.controller.js');
const express = require('express');
const userRouter = express.Router();

const ROUTES = {
  BASE: '/',
  ID: '/:id',
};

userRouter.get(ROUTES.BASE, userController.get);
userRouter.get(ROUTES.ID, userController.getOne);
userRouter.post(ROUTES.BASE, userController.post);
userRouter.delete(ROUTES.ID, userController.remove);
userRouter.patch(ROUTES.ID, userController.patch);

module.exports = userRouter;
