'use strict';

const statusCode = require('../constants/statusCodes');
const userService = require('../services/user.service');
const { isIdValid } = require('../helpers/isIdValid');
const BAD_REQUEST_MESSAGE = 'Bad request';

const getUsers = async(_, res) => {
  res.status(statusCode.OK);
  res.send(await userService.getUsers());
};

const getUserById = async(req, res) => {
  const { id } = req.params;

  if (!id || !isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  try {
    const user = await userService.getUserById(+id);

    res.status(statusCode.OK);
    res.send(user);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);

    return;
  }

  const newUser = await userService.createUser(name);

  res.status(statusCode.CREATED);
  res.send(newUser);
};

const deleteUser = async(req, res) => {
  const { id } = req.params;

  if (!isIdValid(id)) {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);
  }

  try {
    await userService.deleteUser(+id);
    res.sendStatus(statusCode.UNDERSTOOD);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

const changeUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!isIdValid(id) || typeof name !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send(BAD_REQUEST_MESSAGE);
  }

  try {
    const changedUser = await userService.changeUser(name, +id);

    res.status(statusCode.OK);
    res.send(changedUser);
  } catch (ex) {
    res.status(statusCode.NOT_FOUND);
    res.send(ex.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  changeUser,
  deleteUser,
  createUser,
};
