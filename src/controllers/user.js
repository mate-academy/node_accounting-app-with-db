'use strict';

const {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  normalize,
} = require('../services/userService');

async function getAllUsersAction(req, res) {
  try {
    const users = await getAllUsers();

    if (!users) {
      res.sendStatus(400).send('No users');
    }
    res.send(users.map(user => normalize(user)));
  } catch (error) {
    res.sendStatus(500).send(error.message);
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
    res.sendStatus(404).send(error.message);
  }
}

async function getUserAction(req, res) {
  const { id } = req.params;

  try {
    const user = await getUser(id);

    res.statusCode = 200;
    res.send(normalize(user));
  } catch (error) {
    res.sendStatus(404).send(error.message);
  }
}

async function deleteUserAction(req, res) {
  const { id } = req.params;

  try {
    await getUser(id);
    await deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404).send(error.message);
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

    await updateUser(id, name);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404).send(error.message);
  }
}

module.exports = {
  getAllUsersAction,
  addUserAction,
  getUserAction,
  deleteUserAction,
  updateUserAction,
};
