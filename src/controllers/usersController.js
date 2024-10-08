'use strict';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const usersService = require('../services/usersService');

function get(_, res) {
  res.status(StatusCodes.OK).send(usersService.get());
}

function post(req, res) {
  const { name } = req.body;

  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: name is required`);

    return;
  }

  res.status(StatusCodes.CREATED).send(usersService.create(name));
}

function getById(req, res) {
  const { id } = req.params;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  const user = usersService.getById(+id);

  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);

    return;
  }

  res.status(StatusCodes.OK).send(user);
}

function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  if (!usersService.getById(+id)) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);

    return;
  }

  usersService.remove(+id);

  res.sendStatus(StatusCodes.NO_CONTENT);
}

function patch(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: name is required`);

    return;
  }

  if (!usersService.getById(+id)) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);

    return;
  }

  res.status(StatusCodes.OK).send(usersService.update(+id, name));
}

module.exports = {
  get,
  post,
  getById,
  remove,
  patch,
};
