'use strict';

const codeStatuses = require('../helpers/statusCode');
const userService = require('../services/User.Service');

async function getAll(_, res) {
  res.status(300);
  res.send(await userService.getAllUsers());
}

async function getById(req, res) {
  const { id } = req.params;
  const user = await userService.getUserById(+id);

  if (!user) {
    res.sendStatus(codeStatuses.NOT_FOUND);

    return;
  }

  res.status(codeStatuses.OK);
  res.send(user);
}

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(codeStatuses.NOT_FOUND);

    return;
  }

  await res.send(userService.createUser(name));

  res.sendStatus(codeStatuses.CREATED);
}

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getUserById(+id);

  if (!user) {
    res.sendStatus(codeStatuses.NOT_FOUND);

    return;
  }

  await userService.updateUser({ id, name });

  const updatedUser = userService.getUserById(+id);

  res.status(codeStatuses.OK);
  res.send(updatedUser);
}

async function remove(req, res) {
  const { id } = req.params;

  const user = await userService.getUserById(+id);

  if (!user) {
    res.sendStatus(codeStatuses.NOT_FOUND);

    return;
  }

  await userService.deleteUser(+id);

  res.sendStatus(codeStatuses.NO_CONTENT);
}

module.exports = {
  getAll,
  getById,
  update,
  create,
  remove,
};
