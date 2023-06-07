'use strict';

const userServices = require('../services/userServices');

async function getUsers(req, res) {
  const users = await userServices.getUsers();

  res.send(users);
};

async function getUserById(req, res) {
  const { id } = req.params;
  const user = await userServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.createUser(name);

  res.status(201);
  res.send(newUser);
};

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = userServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userServices.deleteUser(id);

  res.sendStatus(204);
};

async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const user = userServices.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await userServices.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
