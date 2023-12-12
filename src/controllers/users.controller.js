'use strict';

const {
  getAll,
  getOne,
  create,
  remove,
  update,
  normalizeUser,
} = require('../services/users.service');

const getAllUsers = async(req, res) => {
  const users = await getAll();

  res.send(users.map(user => normalizeUser(user)));
};

const getUserById = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(normalizeUser(user));
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await create(name);

  res.statusCode = 201;
  res.send(normalizeUser(newUser));
};

const removeUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await remove(id);

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const user = await getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await update(id, name);

  res.setHeader('content-type', 'application/json');
  res.send(normalizeUser(updatedUser));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
