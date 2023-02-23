'use strict';

const userService = require('../services/users');
const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  try {
    userService.remove(userId);
    res.sendStatus(204);
  } catch (e) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);
  }
};

const update = async(req, res) => {
  const { userId } = req.params;
  const fieldsForUpdate = req.body;

  try {
    const updatedUser = await userService.update({
      userId, fieldsForUpdate,
    });

    res.send(updatedUser);
  } catch (e) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);
  }
};

module.exports = {
  getAll, getOne, add, remove, update,
};
