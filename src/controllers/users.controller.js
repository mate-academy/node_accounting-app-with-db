'use strict';

const {
  getAllUsers,
  getUserById,
  addNewUser,
  removeUser,
  updateUser,
} = require('../services/users.service');

const get = (req, res) => res.send(getAllUsers());

const add = (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = addNewUser(name);

  res.status(201);
  res.send(newUser);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const removeOne = (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  removeUser(id);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  updateUser(id, name);

  res.send(user);
};

module.exports = {
  get,
  add,
  getOne,
  removeOne,
  updateOne,
};
