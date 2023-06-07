'use strict';

const userServices = require('../services/userServices');

async function getAllUsers(req, res) {
  const allUsers = await userServices.getAllUsers();

  res.send(allUsers);
}

async function getUserById(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const user = await userServices.getByUserId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(user);
}

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.create(name);

  res.status(201);
  res.send(newUser);
}

async function remove(req, res) {
  const { userId } = req.params;

  const foundUser = await userServices.getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(userId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { userId } = req.params;
  const user = await userServices.getByUserId(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await userServices.update(userId, name);

  res.status(200);
  res.send(updatedUser);
}

module.exports = {
  getAllUsers,
  getUserById,
  create,
  remove,
  update,
};
