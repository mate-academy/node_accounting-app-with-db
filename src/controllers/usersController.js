'use strict';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const usersService = require('../services/usersService');

async function get(_, res) {
  res.status(StatusCodes.OK).send(await usersService.get());
}

async function post(req, res) {
  const { name } = req.body;

  if (!name) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: name is required`);

    return;
  }

  res.status(StatusCodes.CREATED).send(await usersService.create(name));
}

async function getById(req, res) {
  const { id } = req.params;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);

    return;
  }

  res.status(StatusCodes.OK).send(user);
}

async function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  if (!usersService.getById(id)) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);
  }

  usersService.remove(id);

  res.sendStatus(StatusCodes.NO_CONTENT);
}

async function patch(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: name is required`);
  }

  try {
    const user = await usersService.getById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);
    }

    await usersService.update(id, name);

    const updatedUser = await usersService.getById(id);

    return res.status(StatusCodes.OK).send(updatedUser);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

module.exports = {
  get,
  post,
  getById,
  remove,
  patch,
};
