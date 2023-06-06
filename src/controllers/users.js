'use strict';

const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(foundUser);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.addUser(name);

  res.sendStatus(201);
  res.send(newUser);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updateUser = await userService.update({
    id: userId,
    name,
  });

  res.sendStatus(200);
  res.send(updateUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  addUser,
  update,
  remove,
};
