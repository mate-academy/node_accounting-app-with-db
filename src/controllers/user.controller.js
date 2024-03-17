'use strict';

const userService = require('../services/user.service');
const { messages } = require('../types/messages');
const { statusCode } = require('../types/status.messages');

const getAll = async (req, res) => {
  res.send(await userService.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(+id);

  if (!user) {
    res.status(statusCode.notFound).send(messages.user.notFound);

    return;
  }

  res.status(statusCode.ok).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(statusCode.badRequest).send(messages.user.requiredFields);

    return;
  }

  const user = await userService.create(name);

  res.status(statusCode.created).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await userService.remove(+id);

  if (!user) {
    res.status(statusCode.notFound).send(messages.user.notFound);

    return;
  }

  res.status(statusCode.deleted).send(messages.user.deleted);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(statusCode.badRequest).send(messages.user.requiredFields);

    return;
  }

  await userService.update(+id, name);

  const user = await userService.getById(id);

  if (!user) {
    res.status(statusCode.notFound).send(messages.user.notFound);

    return;
  }

  res.status(statusCode.ok).send(user);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
