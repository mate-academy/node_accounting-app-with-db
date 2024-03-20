'use strict';

const { statusCode } = require('../helpers/statusCode');
const userService = require('../services/user.service');

const getAll = async (req, res) => {
  res.status(200);
  res.send(await userService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.status(statusCode.OK);
  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const user = await userService.create(name);

  res.status(statusCode.CREATED);
  res.send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  await userService.remove(+id);
  res.sendStatus(statusCode.NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.getById(+id);

  if (!user) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  await userService.update({ id, name });

  const updatedUser = await userService.getById(+id);

  res.status(statusCode.OK);
  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
