/* eslint-disable no-console */
'use strict';

const userService = require('../services/user.services');

const getAllUsers = async(req, res) => {
  const users = await userService.getAllUsers();

  res.statusCode = 200;
  res.send(users);
};

const getOneUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
  }

  const user = await userService.getUserById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const newUser = await userService.createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const findUser = await userService.getUserById(+id);

  if (!findUser) {
    res.status(404);
    res.send('User not found');

    return;
  }

  const updatedUser = await userService.updateUser(+id, name);

  res.statusCode = 200;
  res.send(updatedUser);
};

const removeUser = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getUserById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(+id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
