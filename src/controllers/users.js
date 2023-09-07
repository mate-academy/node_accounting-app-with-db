'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/usersServices.js');

async function getUsers(req, res) {
  const users = await getAll();

  res.status(200).send(users);
};

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await create(name);

  res.status(201).send(newUser);
};

async function getUser(req, res) {
  const { id } = req.params;

  const foundUser = await getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
};

async function deleteUser(req, res) {
  const { id } = req.params;

  const foundUser = await getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  remove(id);
  res.sendStatus(204);
};

async function updateUser(req, res) {
  const { id } = req.params;

  const foundUser = await getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name && typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  await update({
    id,
    name,
  });

  res.status(200).send(await getById(id));
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
