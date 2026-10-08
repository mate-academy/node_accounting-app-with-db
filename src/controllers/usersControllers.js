'use strict';

const {
  createUser,
  findUsers,
  getUserId,
  patchUser,
  deleteUser,
} = require('../services/usersService');

const createUserController = async (req, res) => {
  try {
    const newUser = await createUser(req.body);

    if (!newUser) {
      res.status(400);
      res.end();
    } else {
      res.status(201);
      res.json(newUser);
    }
  } catch (error) {
    res.status(400);
    res.end();
  }
};

const getUsers = async (req, res) => {
  const users = await findUsers();

  if (!users) {
    res.status(404);
    res.end();
  } else {
    res.status(200);
    res.json(users);
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const usersId = await getUserId(id);

  if (!usersId) {
    res.status(404);
    res.end();
  } else {
    res.status(200);
    res.json(usersId);
  }
};

const patchUserById = async (req, res) => {
  const id = req.params.id;
  const userBody = req.body;
  const userUpdated = await patchUser(id, userBody);

  if (!userUpdated) {
    res.status(404);
    res.end();
  } else {
    res.status(200);
    res.json(userUpdated);
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  const userRemoved = await deleteUser(id);

  if (!userRemoved) {
    res.status(404);
    res.end();
  } else {
    res.status(204).end();
  }
};

module.exports = {
  createUserController,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
};
