'use strict';

const { normalize } = require('../models/User.model');
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../services/users.serveces');

const getAllUsers = async(req, res) => {
  const users = await getUsers();

  if (!users) {
    res.sendStatus(404);
    res.message = 'Not found';

    return;
  }

  if (!users.length) {
    res.status(200);
    res.send([]);
  } else {
    res.status(200);
    res.send(users.map(user => normalize(user)));
  }
};

const createOneUser = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400);
    res.send('The name is invalid');

    return;
  }

  await createUser(name);

  res.sendStatus(201);
};

const getOneUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('The id is invalid');

    return;
  }

  const user = await getUser(id);

  if (!user) {
    res.status(404);
    res.send('Not found');

    return;
  }

  res.status(200);
  res.send(normalize(user));
};

const deleteOneUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('The id is invalid');

    return;
  }

  const user = await getUser(id);

  if (!user) {
    res.status(404);
    res.send('Not found');
  } else {
    await deleteUser(id);

    res.sendStatus(204);
  }
};

const updateOneUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.status(400);
    res.send('The id is invalid');

    return;
  }

  if (typeof name !== 'string') {
    res.status(400);
    res.send('The name is invalid');

    return;
  }

  const user = await getUser(id);

  if (!user) {
    res.status(404);
    res.send('Not found');
  } else {
    await updateUser({
      id, name,
    });

    res.sendStatus(200);
  }
};

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
};
