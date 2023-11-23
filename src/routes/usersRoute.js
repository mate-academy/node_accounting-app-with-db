'use strict';

const express = require('express');
const usersConroller = require('./../controllers/usersConroller');

const usersRouter = express.Router();

usersRouter.get('/', usersConroller.get);

usersRouter.get('/:id', usersConroller.getOne);

usersRouter.post('/', usersConroller.create);

usersRouter.delete('/:id', usersConroller.remove);

usersRouter.patch('/:id', usersConroller.update);

module.exports = { usersRouter };
