'use strict';

const userService = require('../services/user.service');

const getAll = async(req, res) => {
  res.send(await userService.readAll());
};

const get = async(req, res) => {
  const { id } = req.params;
  const user = await userService.read(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(user);
};

const create = async(req, res) => {
  const body = req.body;

  if (!body.hasOwnProperty('name')) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(body);

  res.status(201).json(user);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const user = await userService.read(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(+id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await userService.read(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.update(+id, body);

  res.send(await userService.read(+id));
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
