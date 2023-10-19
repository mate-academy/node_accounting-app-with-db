'use strict';

const userService = require('../services/user.service');
const httpStatusCodes = require('../utils/httpStatusCodes');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(
    users.map(user => userService.normalize(user))
  );
};

const getById = async(req, res) => {
  const { id } = req.params;
  const searchedUser = await userService.getById(id);

  if (!searchedUser) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  res.send(userService.normalize(searchedUser));
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(httpStatusCodes.BAD_REQUEST);

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = httpStatusCodes.CREATED;
  res.send(newUser);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(httpStatusCodes.UNPROCESSABLE_ENTITY);

    return;
  }

  const updatedUser = await userService.update({
    id, name,
  });

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(httpStatusCodes.NOT_FOUND);

    return;
  }

  await userService.remove(id);
  res.sendStatus(httpStatusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
