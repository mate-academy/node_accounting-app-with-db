/* eslint-disable no-console */
'use strict';

const {
  getAllUsers, getUserById, createUser, deletUser, editNameOfUser,
} = require('../services/users.services');

const getAll = async(req, res) => {
  const users = await getAllUsers();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.sendStatus(404);

    return;
  }

  try {
    const user = await getUserById(id);

    if (user === null || user.length === 0) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (e) {
    res.sendStatus(404);
  }
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201);
  res.send(await createUser(name));
};

const deleteUser = async(req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.sendStatus(400);

    return;
  }

  try {
    const isUserExist = await getUserById(id);

    if (isUserExist === null) {
      res.sendStatus(404);

      return;
    }

    await deletUser(id);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};

const editUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = await getUserById(id);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const editedUser = await editNameOfUser(id, name);

  res.send(editedUser);
};

module.exports = {
  getAll,
  getOne,
  addUser,
  deleteUser,
  editUser,
};
