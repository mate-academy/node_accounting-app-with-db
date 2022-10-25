'use strict';

const {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
} = require('../services/users');

const getMany = async(req, res) => {
  const users = await getAll();

  res.send(users);
  res.statusCode = 200;
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const addNew = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  removeUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  updateUser({
    id: userId,
    name,
  });

  res.send(foundUser);
  res.statusCode = 200;
};

module.exports = {
  getMany,
  getOne,
  addNew,
  remove,
  update,
};
