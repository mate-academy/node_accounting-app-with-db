'use strict';

const { STATUS_MESSAGES } = require('../utils/constants');
const usersService = require('../services/users.service');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(users);
};

const getById = async(req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const newUser = {
    id: Number(new Date()),
    name,
  };

  const user = await usersService.add(newUser);

  res.statusCode = STATUS_MESSAGES.NEW_RESOURCE_CREATED;
  res.send(user);
};

const update = async(req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  const updatedUser = await usersService.updateById(id, name);

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(updatedUser);
};

const remove = async(req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  await usersService.remove(id);
  res.sendStatus(STATUS_MESSAGES.ITEM_DELETED);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
