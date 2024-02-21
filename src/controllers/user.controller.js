'use strict';

const userService = require('../services/user.service.js');

const get = async(req, res) => {
  res.send(await userService.getAll());
};

const getOne = async(req, res) => {
  const { parsedId } = req;

  const user = await userService.getById(parsedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.status(201).send(user);
};

const remove = async(req, res) => {
  const { parsedId } = req;

  const user = await userService.getById(parsedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(parsedId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { parsedId } = req;
  const { name } = req.body;

  const user = userService.getById(parsedId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  await userService.update({
    parsedId,
    name,
  });

  const updatedUser = await userService.getById(parsedId);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
