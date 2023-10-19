'use strict';

const { Router } = require('express');
const {
  get,
  getOne,
  remove,
  patch,
  post,
} = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', get);
usersRouter.get('/:id', getOne);
usersRouter.post('/', post);
usersRouter.delete('/:id', remove);
usersRouter.patch('/:id', patch);

module.exports = {
  usersRouter,
};
