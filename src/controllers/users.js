'use strict';

const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../services/usersServer');
const { normalize } = require('../models/user');

async function getAllUsersAction(req, res) {
  const users = await getAllUsers();

  res.send(users.map(user => normalize(user)));
};

async function addUserAction(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await addUser(name);

  res.statusCode = 201;
  res.send(normalize(user));
}

async function getUserAction(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const user = await getUser(id);

  if (!user) {
    res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(normalize(user));
}

function deleteUserAction(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  deleteUser(id);
  res.sendStatus(204);
};

function updateUserAction(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  updateUser(id, name);

  res.sendStatus(200);
}

module.exports = {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
};
