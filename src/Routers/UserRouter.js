'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllController,
  getByIdController,
  deleteUserController,
  postUserController,
  updateUserController,
} = require('../controllers/User.controller');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.get('/', getAllController);

usersRouter.get('/:userId', getByIdController);

usersRouter.delete('/:userId', deleteUserController);

usersRouter.post('/', postUserController);

usersRouter.patch('/:userId', updateUserController);

module.exports = {
  usersRouter,
};
