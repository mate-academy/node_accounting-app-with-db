'use strict';

const service = require('./../services/users.service');

const get = async(_, res) => {
  res.send(await service.get());
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = await service.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).send('Incorrect name');

    return;
  }

  const user = await service.create(name);

  res.status(201).send(user);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const user = await service.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  await service.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).send('Incorrect name');

    return;
  }

  const user = await service.getById(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  const updatedUser = await service.update(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
