'use strict';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const usersService = require('../services/usersService');

async function get(_, res) {
  try {
    return res.status(StatusCodes.OK).send(await usersService.get());
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function post(req, res) {
  const { name } = req.body;

  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: name is required`);
  }

  try {
    return res
      .status(StatusCodes.CREATED)
      .send(await usersService.create(name));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function getById(req, res) {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);
  }

  try {
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
}

async function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: user with id ${id} does not exist`);
  }

  try {
    await usersService.remove(id);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${error.message}`);
  }
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

    const [result] = await usersService.update(id, name);

    if (result !== 1) {
      return res.status(StatusCodes.NOT_FOUND).send('User not found');
    }

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
