'use strict';

const express = require('express');
const {
  getAll,
  getOne,
  add,
  remove,
  update,
} = require('../controllers/users.js');

const usersRouter = express.Router();

usersRouter.get('/', getAll);
usersRouter.get('/:userId', getOne);
usersRouter.post('/', add);
usersRouter.delete('/:userId', remove);
usersRouter.patch('/:userId', update);

module.exports = {
  usersRouter,
};
