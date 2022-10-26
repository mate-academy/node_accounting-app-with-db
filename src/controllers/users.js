'use strict';

const {
  getAll: getAllUsers,
  getOne: getOneUser,
  create: createUser,
  remove: removeUser,
  update: updateUser,
} = require('../services/users');

const getAll = (req, res) => {
  const users = getAllUsers();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getOneUser(userId);

  foundUser ? res.send(foundUser) : res.sendStatus(404);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const isUserFound = removeUser(userId);

  res.sendStatus(isUserFound ? 204 : 404);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (isNaN(+userId) || !name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const foundUser = getOneUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  updateUser(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
