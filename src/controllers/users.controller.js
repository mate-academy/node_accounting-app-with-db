'use strict';

const usersService = require('../services/users.service');

const get = async(req, res) => {
  res.send(await usersService.getAllUsers());
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.deleteUser(id);

  res.sendStatus(204);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.createUser(name);

  res.status(201).send(user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await usersService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
