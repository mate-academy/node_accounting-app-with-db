'use strict';

const { getAll, getById, create, update, remove, normalize }
  = require('../services/usersService');

const get = async(req, res) => {
  const users = await getAll();

  res.send(
    users.map(user => normalize(user))
  );
};
const getUser = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(user));
};
const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  const user = create(name);

  res.send(user);
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id) || !name) {
    res.sendStatus(400);

    return;
  }

  const findUser = getById(+id);

  if (!findUser) {
    res.status(404);

    return;
  }

  const user = update(+id, name);

  res.status(200);
  res.send(user);
};
const deleteUser = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(204);

    return;
  }

  if (!getById(+id)) {
    res.sendStatus(404);

    return;
  }

  remove(+id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
