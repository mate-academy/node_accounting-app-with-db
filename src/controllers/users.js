'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.status(200).send(users.map(userService.normalize));
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundedUser = await userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(userService.normalize(foundedUser));
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.status(201).send(userService.normalize(newUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundedUser = await userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundedUser = await userService.getById(userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  await userService.update({
    userId,
    name,
  });

  const updatedUser = await userService.getById(userId);

  res.status(200).send(userService.normalize(updatedUser));
};

const userController = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = userController;
