'use strict';

const userServices = require('../services/users');

async function getAll(req, res) {
  const users = await userServices.getAll();

  res.statusCode = 200;
  res.send(users);
}

async function getOne(req, res) {
  const { userId } = req.params;

  if (!(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
}

async function addNew(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = await userServices.addNew(name);

  res.statusCode = 201;
  res.send(newUser);
}

async function remove(req, res) {
  const { userId } = req.params;

  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userServices.remove(userId);
  res.sendStatus(204);
}

async function change(req, res) {
  const { userId } = req.params;

  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  await userServices.change(userId, name);

  const newfoundUser = await userServices.getById(userId);

  res.send(newfoundUser);
}

module.exports = {
  getOne,
  getAll,
  addNew,
  change,
  remove,
};
