'use strict';

const usersService = require('../services/user.service');

const get = async(req, res) => {
  res.send(await usersService.getAll());
};

const getOne = async(req, res) => {
  const id = parseInt(req.params.id);
  const user = await usersService.getById(id);

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

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

  const user = await usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.update(+id, name);

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(user.id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
