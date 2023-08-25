'use strict';

const userService = require('../services/users');

const getUsers = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const updateUser = async(req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const foundUser = await userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if ('id' in req.body) {
    res.sendStatus(400);

    return;
  }

  await userService.update({
    id: +userId,
    name,
  });

  res.send(foundUser);
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(+userId);

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
