'use strict';

const service = require('../services/users.service');

const normalize = ({ id, name }) => ({
  id, name,
});

const get = async(req, res) => {
  const data = (await service.getAll()).map(value => normalize(value));

  res.send(data);
};

const post = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required.' });

    return;
  }

  const data = await service.add(name);

  res.statusCode = 201;
  res.send(normalize(data));
};

const getUser = async(req, res) => {
  const searchedUser = await service.getById(+req.params.id);

  if (!searchedUser) {
    res.sendStatus(404);

    return;
  }

  if (!req.params.id) {
    res.sendStatus(400);

    return;
  }

  res.send(normalize(searchedUser));
};

const removeUser = async(req, res) => {
  try {
    await service.remove(+req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

const updateUser = async(req, res) => {
  if (!req.body || !req.params.id) {
    res.sendStatus(400);

    return;
  }

  const data = await service.update(+req.params.id, req.body.name);

  if (!data) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(data));
};

module.exports = {
  get,
  post,
  getUser,
  removeUser,
  updateUser,
};
