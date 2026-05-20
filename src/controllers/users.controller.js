'use strict';

const {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  toUserDto,
} = require('../services/users.service');
const { isEmpty } = require('../services/helpers');

async function listUsers(req, res) {
  const users = await getUsers();

  res.json(users.map(toUserDto));
}

async function getUser(req, res) {
  const user = await getUserById(req.params.id);

  if (!user) {
    return res.status(404).end();
  }

  res.json(toUserDto(user));
}

async function createUserHandler(req, res) {
  const name = req.body?.name;

  if (isEmpty(name)) {
    return res.status(400).end();
  }

  const user = await createUser({ name });

  res.status(201).json(toUserDto(user));
}

async function handleUpdate(req, res) {
  const user = await updateUser(req.params.id, req.body ?? {});

  if (!user) {
    return res.status(404).end();
  }

  res.json(toUserDto(user));
}

async function deleteUserHandler(req, res) {
  const deleted = await deleteUser(req.params.id);

  if (!deleted) {
    return res.status(404).end();
  }

  res.status(204).end();
}

module.exports = {
  listUsers,
  getUser,
  createUserHandler,
  handleUpdate,
  deleteUserHandler,
};
