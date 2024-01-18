'use strict';

const userServices = require('../services/users.services');

const getAll = async(req, res) => {
  res.send(await userServices.findAll());
};

const getById = async(req, res) => {
  const { id } = req.params;

  const user = await userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.create(name);

  res.sendStatus(201);
  res.send(newUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!userServices.getById(+id)) {
    return res.sendStatus(404);
  }

  await userServices.remove(+id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedUser = await userServices.update(name, +id);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
