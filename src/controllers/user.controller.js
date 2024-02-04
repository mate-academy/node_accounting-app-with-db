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
  // eslint-disable-next-line max-len
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const isUserExist = await getUserById(id);

  if (id === undefined || !id.match(pattern)) {
    res.sendStatus(400);

    return;
  }

  if (isUserExist === null) {
    res.sendStatus(404);

    return;
  }

  await deletUser(id);
  res.sendStatus(204);
};

const editUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;
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