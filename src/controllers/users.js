'use strict';

const userServices = require('../services/users');

const getAll = async(req, res) => {
  const users = await userServices.getAll();

  res.send(
    users.map(userServices.normalize)
  );
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(
    userServices.normalize(foundUser),
  );
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.create(name);

  res.status(201);

  res.send(
    userServices.normalize(newUser),
  );
};

const remove = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

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

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await userServices.update({
    id: userId,
    name,
  });

  const updatedUser = await userServices.getById(userId);

  res.send(
    userServices.normalize(updatedUser),
  );
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
