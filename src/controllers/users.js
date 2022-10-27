'use strict';

const userService = require('../services/users.js');

const getAllUsers = async(req, res) => {
  const users = await userService.getAll();

  res.statusCode = 200;
  res.send(users);
};

const getUser = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.add(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);
  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.update(userId, name);

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
