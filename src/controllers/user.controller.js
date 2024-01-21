'use strict';

const userService = require('../services/user.service');

const getAll = async(_, res) => {
  try {
    res.send(await userService.getAll());
  } catch (error) {
    res.sendStatus(404);
  }
};

const getById = async(req, res) => {
  const { id } = req.params;

  if (!id || Number.isNaN(id) || !isFinite(id) || id <= 0) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(Number(id));

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

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const userToRemove = await userService.getById(Number(id));

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userToRemove.id);

  res.sendStatus(204);
};

const patch = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (
    !id
    || Number.isNaN(id)
    || !isFinite(id)
    || id <= 0
    || !name
    || typeof name !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = await userService.getById(Number(id));

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await userService.patch(userToUpdate.id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
};
