'use strict';

const userServices = require('../services/users.js');
const { checkUuid } = require('../utils/functions.js');

async function getAll(req, res) {
  try {
    const users = await userServices.getAll();

    res.status(200).send(users);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

async function getUser(req, res) {
  const userId = req.params.userId;

  if (checkUuid(userId)) {
    res.sendStatus(400);

    return;
  }

  try {
    const userById = await userServices.getUser(userId);

    res.status(200).send(userById);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

async function addUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const newUser = await userServices.addUser(name);

    res.status(201).send(newUser);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

async function removeUser(req, res) {
  const userId = req.params.userId;

  try {
    const user = await userServices.getUser(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await userServices.removeUser(userId);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

async function updateUser(req, res) {
  const userId = req.params.userId;

  try {
    const user = await userServices.getUser(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    const updatedUser = await userServices.updateUser(userId, name);

    res.status(200).send(updatedUser);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }

  // const { name } = req.body;

  // if (!name) {
  //   res.sendStatus(400);

  //   return;
  // }

  // const updatedUser = await userServices.updateUser(userId, name);

  // res.status(200).send(updatedUser);
}

module.exports = {
  getAll,
  getUser,
  addUser,
  removeUser,
  updateUser,
};
