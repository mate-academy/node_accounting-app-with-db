'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.status(400).send('Bad Request. User id must be a number');

    return;
  }

  const foundUser = await usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('Not Found. User with this id does not exist');

    return;
  }

  res.send(foundUser);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400)
      .send('Bad Request. User name should contain at least one letter');

    return;
  }

  const newUser = await usersService.create(name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.status(400).send('Bad Request. User id must be a number');

    return;
  }

  const foundUser = await usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('Not Found. User with this id does not exist');

    return;
  }

  await usersService.remove(Number(userId));
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(Number(userId))) {
    res.status(400).send('Bad Request. User id must be a number');

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400)
      .send('Bad Request. User name should contain at least one letter');

    return;
  }

  const foundUser = await usersService.getById(Number(userId));

  if (!foundUser) {
    res.status(404).send('Not Found. User with this id does not exist');

    return;
  }

  const updatedUser = await usersService.update(Number(userId), name);

  res.send(updatedUser);
};

module.exports = {
  getAll, getById, create, remove, update,
};
