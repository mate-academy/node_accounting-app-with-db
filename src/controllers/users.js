'use strict';

const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).send(foundUser);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Fill required fileds');

    return;
  }

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.status(404).end('User not found');

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).send('No name to update');

    return;
  }

  const updatedUser = await userService.update(userId, name);

  res.status(200).send(updatedUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.status(404).end('User not found');

    return;
  }

  userService.remove(userId);

  res.sendStatus(204).send();
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
