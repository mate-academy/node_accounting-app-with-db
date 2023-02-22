'use strict';

const userServise = require('../services/users');

const getAll = async(req, res) => {
  const users = await userServise.getAll();

  res.send(
    users.map(userServise.normalize),
  );
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(
    userServise.normalize(foundUser),
  );
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServise.create(name);

  res.statusCode = 201;

  res.send(
    userServise.normalize(newUser),
  );
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  await userServise.update({
    id: userId,
    name,
  });

  const updatedUser = await userServise.getById(userId);

  res.send(
    userServise.normalize(updatedUser),
  );
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userServise.remove(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  add,
  getOne,
  update,
  remove,
};
