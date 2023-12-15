'use strict';

const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getUser,
  validateId,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.use('/:id', validateId);

userRouter
  .get('/', getAllUsers)
  .post('/', createNewUser)
  .get('/:id', getUser)
  .delete('/:id', deleteUser)
  .patch('/:id', updateUser);

module.exports = {
  userRouter,
};
