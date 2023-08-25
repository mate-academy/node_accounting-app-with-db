/* eslint-disable space-before-function-paren */
'use strict';

const {
  getAll,
  getUserById,
  create,
  remove,
  update,
  normalize,
} = require('../services/users');

const getAllUsers = async (req, res) => {
  const users = await getAll();

  res.send(users.map(normalize));
};

const getOne = async (req, res) => {
  const { userId } = req.params;
  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = async (req, res) => {
  const { userId } = req.params;
  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await remove(userId);
  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await update({
    id: userId, name,
  });

  res.statusCode = 200;

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOne,
  addUser,
  removeUser,
  updateUser,
  getUserById,
};
