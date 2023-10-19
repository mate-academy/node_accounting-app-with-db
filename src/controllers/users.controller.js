'use strict';

const usersService = require('../services/users.service');
const responseCodes = require('../constants/responseCodes');

const get = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.statusCode = responseCodes.SUCCESS;
  res.send(user);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const newUser = await usersService.add(name);

  res.statusCode = responseCodes.CREATED;
  res.send(newUser);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const updatedUser = await usersService.update(id, name);

  if (!updatedUser) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.statusCode = responseCodes.SUCCESS;
  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const isUserDeleted = await usersService.remove(id);

  if (!isUserDeleted) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.sendStatus(responseCodes.DELETED);
};

module.exports = {
  get,
  getOne,
  add,
  update,
  remove,
};
