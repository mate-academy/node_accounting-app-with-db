'use strict';

const userService = require('../services/user.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getOne(userId);

  if (!foundUser) {
    res.status(404).send('User not found');

    return;
  }

  res.status(200).send(foundUser);
};

const addOne = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Fill required fileds');

    return;
  }

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getOne(userId);

  if (!foundUser) {
    res.status(404).end('User not found');

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(422).send('Fill the name');

    return;
  }

  const updatedUser = await userService.updateOne(userId, name);

  res.status(200).send(updatedUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getOne(userId);

  if (!foundUser) {
    res.status(404).end('User not found');

    return;
  }

  userService.deleteOne(userId);

  res.sendStatus(204).send();
};

module.exports = {
  getAll, getOne, addOne, update, remove,
};
