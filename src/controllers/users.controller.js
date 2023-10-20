'use strict';

const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../constants/statusCodes');
const service = require('../services/users.services');

const getAllUsers = (req, res) => {
  res.statusCode = OK;
  res.send(service.getAll());
};

const getUser = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = service.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.statusCode = OK;
  res.send(user);
};

const postUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newUser = {
    id: Number(new Date()),
    name,
  };

  service.add(newUser);
  res.statusCode = CREATED;
  res.send(newUser);
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const user = service.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  service.remove(id);
  res.sendStatus(NO_CONTENT);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const updatedUser = service.update(id, name);

  if (!updatedUser) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  deleteUser,
  updateUser,
};
