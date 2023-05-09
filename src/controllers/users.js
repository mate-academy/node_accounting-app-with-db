'use strict';

const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  normalize,
} = require('../services/usersServer');

async function getAllUsersAction(req, res) {
  try {
    const users = await getAllUsers();

    res.send(users.map(user => normalize(user)));
  } catch (error) {
    res.sendStatus(404);
  }
};

async function addUserAction(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await addUser(name);

    res.statusCode = 201;
    res.send(normalize(user));
  } catch (error) {
    res.sendStatus(404);
  }
}

async function getUserAction(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  try {
    const user = await getUser(id);

    res.statusCode = 200;
    res.send(normalize(user));
  } catch (error) {
    res.sendStatus(404);
  }
}

async function deleteUserAction(req, res) {
  const { id } = req.params;

  try {
    await getUser(id);
    deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

async function updateUserAction(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    await getUser(id);

    updateUser(id, name);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

module.exports = {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
};
