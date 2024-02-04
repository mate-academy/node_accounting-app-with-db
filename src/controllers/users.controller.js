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
  try {
    const users = await getUsers();

    res.sendStatus(200);
    res.send(normalize(users));
  } catch (error) {
    res.sendStatus(404);
  }
};

const createOneUser = async(req, res) => {
  const { name } = req.body;

  try {
    const user = await createUser(name);

    res.sendStatus(201);
    res.send(normalize(user));
  } catch (error) {
    res.sendStatus(400);
    res.message = 'The name is invalid';
  }
};

const getOneUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  try {
    const user = await getUser(id);

    res.sendStatus(200);
    res.send(normalize(user));
  } catch (error) {
    res.sendStatus(404);
  }
};

const deleteOneUser = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  try {
    await deleteUser(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

const updateOneUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);
    res.message = 'The name is invalid';

    return;
  }

  try {
    const updatedUser = await updateUser({
      id,
      name,
    });

    res.sendStatus(200);
    res.send(normalize(updatedUser));
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
};
