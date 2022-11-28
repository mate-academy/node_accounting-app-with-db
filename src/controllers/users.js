'use strict';

const userServices = require('../services/users');
const { normalize } = require('../utils/normalize');

const getAll = async(req, res) => {
  const users = await userServices.getAll();

  res.send(users.map(normalize));
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundUser));
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.create(name);

  res.statusCode = 201;
  res.send(normalize(newUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userServices.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userServices.update(userId, name);

  res.send(normalize(updatedUser));
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
