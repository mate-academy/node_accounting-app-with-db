const express = require('express');
const {
  get,
  getOne,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', get);

userRouter.get('/:id', getOne);

userRouter.post('/', express.json(), createUser);

userRouter.patch('/:id', express.json(), updateUser);

userRouter.delete('/:id', removeUser);

module.exports = {
  userRouter,
};
