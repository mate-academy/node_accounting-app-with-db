/* eslint-disable object-curly-newline */
'use strict';

const usersService = require('../models/users.js');

const getUsers = async(req, res) => {
  const users = await usersService.getUsers();

  res.send(users);
};

const getUser = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.createUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersService.removeUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await usersService.updateUser({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUser,
  add,
  remove,
  update,
};
