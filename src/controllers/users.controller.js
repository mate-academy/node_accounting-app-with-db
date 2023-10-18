'use strict';

const {
  BAD_REQUEST,
  CREATED_SUCCESS,
  NOT_FOUND,
  NO_CONTENT_SUCCESS,
} = require('../../constants/statusCodes');
const usersService = require('./../services/users.service');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newUser = {
    name,
    id: Number(new Date()),
  };

  const user = await usersService.add(newUser);

  res.statusCode = CREATED_SUCCESS;

  res.send(user);
};

const getById = async(req, res) => {
  const id = Number(req.params.id);

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(user);
};

const remove = async(req, res) => {
  const id = Number(req.params.id);

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  await usersService.remove(id);

  res.sendStatus(NO_CONTENT_SUCCESS);
};

const update = async(req, res) => {
  const id = Number(req.params.id);

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const { name } = req.body;

  await usersService.updateById(id, name);

  const updatedUser = await usersService.getById(id);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
