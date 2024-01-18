'use strict';

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
} = require('../services/users.service');

async function getUsers(req, res) {
  let users;

  try {
    users = await getAllUsers();

    res.send(users);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function getOneUser(req, res) {
  const { id } = req.params;

  const expectedUser = await getUserById(id);

  if (!expectedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(expectedUser);
}

async function createNewUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await createUser(name);

  res.statusCode = 201;
  res.send(newUser);
}

async function updateOneUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || name.length === 0) {
    res.sendStatus(400);

    return;
  }

  if (!await getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(await updateUser(id, name));
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (!await getUserById(id)) {
    res.sendStatus(404);

    return;
  }
  await removeUser(id);

  res.sendStatus(204);
}

module.exports = {
  getUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteUser,
};
