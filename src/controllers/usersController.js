'use strict';

const usersService = require('../services/usersService');
const codeStatus = require('../constants/codeStatuses');

const get = async (_, res) => {
  res.statusCode = codeStatus.SUCCESS;
  res.send(await usersService.getAll());
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const choosedUser = await usersService.getUserById(id);

  if (!choosedUser) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  res.status(codeStatus.SUCCESS).send(choosedUser);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(codeStatus.BAD_REQUEST);

    return;
  }

  res.statusCode = codeStatus.CREATED;
  res.send(await usersService.create(name));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await usersService.getUserById(id))) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  await usersService.remove(id);

  res.sendStatus(codeStatus.UNDERSTOOD);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = await usersService.getUserById(id);

  if (!choosedUser) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  const updatedUser = await usersService.update({
    id,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  get,
  getUserById,
  create,
  remove,
  update,
};
