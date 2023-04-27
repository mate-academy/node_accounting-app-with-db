'use strict';

const userServices = require('../services/users');

const getAll = async(req, res) => {
  const users = await userServices.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const user = await userServices.getOne(id);

  res.send(user);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const newUser = await userServices.add(name);

  res.send(newUser);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await userServices.update(id, name);

  const updatedUser = await userServices.getOne(id);

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  await userServices.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
