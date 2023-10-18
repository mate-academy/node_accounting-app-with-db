'use strict';

const service = require('../services/users.services');

const getAllUsers = async(req, res) => {
  const data = await service.getAll();

  res.statusCode = 200;
  res.send(data);
};

const getUser = async(req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.statusCode(400);

    return;
  }

  const searcedUser = await service.getById(id);

  if (!searcedUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(searcedUser);
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: +new Date(),
    name,
  };

  service.add(newUser);
  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  service.remove(+req.params.id);
  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { name } = req.body;
  const id = +req.params.id;

  if (!name || !id) {
    res.statusCode(400);

    return;
  }

  const userToUpdate = await service.update(id, name);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  res.send(userToUpdate);
};

module.exports = {
  getAllUsers,
  getUser,
  post,
  removeUser,
  updateUser,
};
