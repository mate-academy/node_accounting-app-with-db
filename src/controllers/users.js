'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    return res.status(400).send('Id is required');
  }

  const user = await usersService.getOne(parseInt(id));

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = await usersService.add(name);

  res.status(201).send(user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = await usersService.update(parseInt(id), name);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const wasRemoved = await usersService.remove(parseInt(id));

  if (!wasRemoved) {
    return res.status(404).send('User not found');
  }

  res.status(204).send('');
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
