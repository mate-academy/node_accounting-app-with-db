'use strict';

const userService = require('../services/users');

const getAllUser = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.findById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
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

const deleteUser = async(req, res) => {
  const { userId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUserId = await userService.remove(userId);

  if (!foundUserId) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateUserById = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const regex = /^\d+$/;

  if (!regex.test(userId)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.update(userId, name);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
};
