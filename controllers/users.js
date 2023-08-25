/* eslint-disable object-curly-newline */
'use strict';

const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.status(200).send(users);
};

const getUser = (req, res) => {
  const { userId } = req.params;

  const foundedUser = usersService.getUserById(userId);

  if (foundedUser) {
    res.status(200).send(foundedUser);
  } else {
    res.status(404).send('User not found');
  }
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Bad request');
  }

  const user = usersService.createUser(name);

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundedUser = usersService.getUserById(userId);

  if (!name) {
    res.status(400).send('Bad request');
  }

  if (foundedUser) {
    usersService.updateUser({ userId, name });

    res.status(200).send(foundedUser);
  } else {
    res.status(404).send('User not found');
  }
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundedUser = usersService.getUserById(userId);

  if (foundedUser) {
    usersService.removeUser(userId);
    res.status(204).send('OK');
  } else {
    res.status(404).send('Bad request');
  }
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
