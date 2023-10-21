'use strict';

const usersService = require('../service/users.services');

const getAllUsers = async(req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users);
};

const getUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User Not Found');

    return;
  }

  res.send(foundUser);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Username Not Found');

    return;
  }

  const newUser = await usersService.createUser(name);

  res.status(201).send(newUser);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User Not Found');

    return;
  }

  if (!name) {
    res.status(404).send('Username Not Found');
  }

  await usersService.updateUser(userId, name);
  res.send(foundUser);
};

const removeUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.status(404).send('User Not Found');

    return;
  }

  await usersService.removeUser(userId);

  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
