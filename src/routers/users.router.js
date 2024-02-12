'use strict';

const express = require('express');
const { usersController } = require('../controllers/users.controller');

const usersRouter = express.Router();

const isExistParam = (param, res, next) => {
  return !param
    ? res.sendStatus(400)
    : next();
};

const checkQueryId = (req, res, next) => {
  const { id } = req.params;

  return isExistParam(id, res, next);
};

const checkParams = (req, res, next) => {
  const { name } = req.body;

  return isExistParam(name, res, next);
};

usersRouter.get('/', usersController.get);
usersRouter.get('/:id', checkQueryId, usersController.getOne);
usersRouter.post('/', checkParams, usersController.create);
usersRouter.delete('/:id', checkQueryId, usersController.remove);
usersRouter.patch('/:id', checkQueryId, checkParams, usersController.update);

module.exports = {
  usersRouter,
};
