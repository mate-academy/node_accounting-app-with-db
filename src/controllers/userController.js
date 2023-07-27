'use strict';

const userServices = require('../services/userServices');

const getAll = async(req, res) => {
  const users = await userServices.getAll();

  res.send(users);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userServices.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const existingUser = await userServices.getUserById(id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  await userServices.remove(id);

  res.status(204).send({ message: 'User has been deleted successfully' });
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const existingUser = await userServices.getUserById(id);

  if (!existingUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userServices.update(id, name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
