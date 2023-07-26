'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users.map(user => usersService.normalize(user)));
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.createUser(name);

  res.status(201);
  res.send(newUser);
};

const getOneUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getUserByID(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(usersService.normalize(foundUser));
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getUserByID(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);
  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await usersService.getUserByID(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.updateUser({
    userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  addUser,
  getOneUser,
  deleteUser,
  updateUser,
};
