'use strict';

const {
  getAll: getAllUsers,
  getOne: getOneUser,
  create: createUser,
  remove: removeUser,
  update: updateUser,
  normalize,
} = require('../services/users');

const getAll = async(req, res) => {
  const users = await getAllUsers();

  res.send(users.map(normalize));
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await getOneUser(userId);

  foundUser ? res.send(normalize(foundUser)) : res.sendStatus(404);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = await createUser(name);

  res.statusCode = 201;
  res.send(normalize(newUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const isUserFound = await removeUser(userId);

  res.sendStatus(isUserFound ? 204 : 404);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (isNaN(+userId) || !name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await getOneUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await updateUser(userId, name);

  res.send(normalize(updatedUser));
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
