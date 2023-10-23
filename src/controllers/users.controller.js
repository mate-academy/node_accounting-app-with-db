'use strict';

const status = require('../utils/constants');
const userService = require('../services/users.services');
const idGenerator = require('../utils/idGenerator');

const getAll = async(req, res) => {
  res.send(await userService.getAll());
};

const getById = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  res.status(status.OK).send(user);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(status.BAD_REQUEST);

    return;
  }

  const user = {
    id: idGenerator(await userService.getAll()),
    name,
  };

  const addedUser = await userService.add(user);

  res.status(status.CREATED).send(addedUser);
};

const updateUser = async(req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!id) {
    res.statusCode(status.BAD_REQUEST);

    return;
  }

  const userToUpdate = await userService.update(+id, name);

  if (!userToUpdate) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  res.send(userToUpdate);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  userService.remove(+id);

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  add,
  deleteById,
  getById,
  updateUser,
};
