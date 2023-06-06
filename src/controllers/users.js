'use strict';

const {
  normalize,
  findAll,
  findById,
  create,
  removeUser,
  updateUser,
} = require('../services/users');

const getAll = async(req, res) => {
  const users = await findAll();

  res.send(users.map(normalize));
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await findById(userId);

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
  getAll,
  getOne,
  add,
  remove,
  update,
};
