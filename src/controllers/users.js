'use strict';

const {
  findUserService,
  createUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
} = require('../services/users.service');

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await createUserService(name);

    res.status(201).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getUsers(req, res) {
  const allUsers = await getAllUsersService();

  res.status(200).send(allUsers);
}

async function getUser(req, res) {
  const { id } = req.params;

  const user = await findUserService(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).send(user);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const targetUser = await findUserService(id);

  if (!targetUser) {
    return res.sendStatus(404);
  }

  await updateUserService(id, name);

  res.status(200).send({ id: +id, name });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (!(await getAllUsersService()).some((user) => user.id === +id)) {
    res.sendStatus(404);

    return;
  }

  await deleteUserService(id);

  res.sendStatus(204);
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
