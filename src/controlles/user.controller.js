/* eslint-disable no-console */
'use strict';

const userService = require('../services/user.service');
const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND_MESSAGE,
  MISSING_PARAM_MESSAGE,
} = require('../variables');

const get = async (req, res) => {
  const users = await userService.getAll();

  console.log('user controller 1');

  res.status(OK).send(users);
};

const getOne = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await userService.getById(userId);

  console.log('user controller 2');

  if (!user) {
    res.status(NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });

    return;
  }

  res.status(OK).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  console.log('user controller 3');

  if (!name) {
    res.status(BAD_REQUEST).send({ message: MISSING_PARAM_MESSAGE });

    return;
  }

  const user = await userService.create(name);

  res.status(CREATED).send(user);
};

const update = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await userService.getById(userId);
  const { name } = req.body;

  if (!user) {
    res.status(NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userService.update(userId, name);

  res.status(OK).send(updatedUser);
};

const remove = async (req, res) => {
  const userId = parseInt(req.params.id);

  const data = await userService.getById(userId);

  if (!data) {
    res.status(NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });

    return;
  }

  await userService.remove(userId);

  res.status(NO_CONTENT).end();
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
