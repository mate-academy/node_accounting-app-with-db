'use strict';

const {
  getAllUsers,
  deleteUser,
  getUserById,
  postNewUser,
  updateUser,
} = require('./../services/userServises');

const getUsers = async(req, res) => {
  const users = await getAllUsers();

  res.send(users);
};

const getUser = async(req, res) => {
  const { id } = req.params;

  const user = await getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const postUser = async(req, res) => {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await postNewUser(name);

  res.status(201).send(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  deleteUser(id);

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
  getUsers,
  postUser,
  getUser,
  removeUser,
  updateOne,
};
