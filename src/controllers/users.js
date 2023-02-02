'use strict';

const usersService = require('../services/users.js');
const { normalize } = require('../services/users.js');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(
    users.map(normalize)
  );
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await usersService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundUser));
};

const add = async(req, res) => {
  const { id, name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.create(id, name);

  res.status(201);
  res.send(normalize(newUser));
};

const change = async(req, res) => {
  const { id } = req.params;
  const foundUser = await usersService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await usersService.update(id, name);

  const updatedUser = await usersService.getUserById(id);

  res.send(normalize(updatedUser));
};

const remove = async(req, res) => {
  const { id } = req.params;
  const foundUser = await usersService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  change,
  remove,
};
