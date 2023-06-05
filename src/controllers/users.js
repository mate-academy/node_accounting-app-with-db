'use strict';

const {
  normalize,
  findAll,
  getById,
  create,
  removeUser,
  updateUser,
} = require('../services/users');

const getAllUsers = async(req, res) => {
  const users = await findAll();
  const normalizeUsers = users.map(normalize);

  if (res) {
    res.send(normalizeUsers);
  }

  return normalizeUsers;
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundUser));
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(create(name));
};

const remove = (req, res) => {
  const { userId } = req.params;

  removeUser(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const user = {
    id: userId,
    name,
  };

  res.send(updateUser(user));
};

module.exports = {
  getAllUsers,
  getOne,
  add,
  remove,
  update,
};
