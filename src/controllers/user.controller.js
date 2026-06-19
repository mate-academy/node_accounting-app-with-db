/* eslint-disable no-console */
const userService = require('../services/user.service');

const getUsers = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = 201;
  res.send(user);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = 200;
  res.send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(+id))) {
    res.sendStatus(404);

    return;
  }
  await userService.remove(+id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updateduser = await userService.update({ id, name });

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = 200;
  res.send(updateduser);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
