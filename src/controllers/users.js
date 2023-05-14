'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
} = require('../services/users');

const getAllUsers = async(req, res) => {
  const users = await getAll();

  res.send(users.map(normalize));
};

const getUserById = async(req, res) => {
  const { id } = req.params;
  const foundUser = await getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundUser));
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await create(name);

  res.statusCode = 201;
  res.send(normalize(newUser));
};

const removeUser = async(req, res) => {
  const { id } = req.params;
  const foundUser = await getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(await remove(id));
};

const updateUser = async(req, res) => {
  const { id } = req.params;

  const foundUser = await getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const result = await update({
    id, name,
  });

  res.send(result);
};

module.exports = {
  getAllUsers, getUserById, createUser, removeUser, updateUser,
};
