'use strict';

const usersServices = require('./services');

module.exports.getUsers = async(req, res) => {
  const users = await usersServices.getAll();

  res.send(users);
};

module.exports.getUser = async(req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUser(numId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

module.exports.addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServices.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

module.exports.deleteUser = async(req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  try {
    await usersServices.deleteUser(numId);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports.updateUser = async(req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const body = req.body;

  if (body.id || !body.name) {
    res.sendStatus(400);

    return;
  }

  try {
    await usersServices.updateUser(numId, body);

    const updatedUser = await usersServices.getUser(numId);

    res.send(updatedUser);
  } catch (err) {
    res.sendStatus(404);
  }
};
