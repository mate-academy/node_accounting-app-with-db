'use strict';

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  STATUS_CODE_NO_CONTENT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
} = require('../constants');

const userService = require('../services/user.service');

const getAll = async(req, res) => {
  res.statusCode = STATUS_CODE_OK;
  res.send(await userService.getAll());
};

const getById = async(req, res) => {
  const userId = Number(req.params.id);

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODE_OK;
  res.send(user);
};

const update = async(req, res) => {
  const userId = Number(req.params.id);
  const { name } = req.body;

  if (typeof name !== 'string' || !name.trim().length || !userId) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  userService.update(userId, name);
  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || !name.trim().length) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = STATUS_CODE_CREATED;
  res.send(user);
};

const remove = async(req, res) => {
  const userId = Number(req.params.id);

  if (!userService.getById(userId)) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  await userService.deleteUser(userId);
  res.sendStatus(STATUS_CODE_NO_CONTENT);
};

module.exports = {
  update,
  getAll,
  getById,
  create,
  remove,
};
