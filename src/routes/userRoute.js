'use strict';

const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
  validateBody,
} = require('../controllers/userController');
const { validateId } = require('../utils/helpers');

const userRouter = express.Router();

userRouter.use('/:id', validateId);

userRouter
  .get('/', getAllUsers)
  .post('/', validateBody, createNewUser)
  .get('/:id', getUser)
  .delete('/:id', deleteUser)
  .patch('/:id', validateBody, updateUser);

module.exports = {
  userRouter,
};
