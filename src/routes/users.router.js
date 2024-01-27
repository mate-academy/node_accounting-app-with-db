'use strict';

const express = require('express');
const {
  get,
  deleteUser,
  getUser,
  createUser,
  updateUser,
}
 = require('../controllers/userControllers');
const userRouter = express.Router();

userRouter.get('/', get);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = {
  userRouter,
};
