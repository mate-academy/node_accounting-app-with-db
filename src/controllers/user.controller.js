'use strict';

const userService = require('../services/user.service.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const create = async(req, res) => {
  const { name } = req.body;

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getById(id);

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.update(id, name);

  res.send(user);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
