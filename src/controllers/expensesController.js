'use strict';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

function get(req, res) {
  const { userId, categories, from, to } = req.query;

  res.status(StatusCodes.OK).send(
    expensesService.get({
      userId,
      categories,
      from,
      to,
    }),
  );
}

function post(req, res) {
  const data = req.body;

  if (!usersService.getById(data.userId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        `${ReasonPhrases.BAD_REQUEST}: user with id ${data.userId} does not exist`,
      );

    return;
  }

  res.status(StatusCodes.CREATED).send(expensesService.create(data));
}

function getById(req, res) {
  const { id } = req.params;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  const expense = expensesService.getById(+id);

  if (!expense) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: expense with id ${id} does not exist`);

    return;
  }

  res.status(StatusCodes.OK).send(expense);
}

function remove(req, res) {
  const { id } = req.params;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  if (!expensesService.getById(+id)) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: expense with id ${id} does not exist`);

    return;
  }

  expensesService.remove(+id);

  res.sendStatus(StatusCodes.NO_CONTENT);
}

function patch(req, res) {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: id is required`);

    return;
  }

  if (!data) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(`${ReasonPhrases.BAD_REQUEST}: data is required`);

    return;
  }

  const expense = expensesService.getById(+id);

  if (!expense) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`${ReasonPhrases.NOT_FOUND}: expense with id ${id} does not exist`);

    return;
  }

  res.status(StatusCodes.OK).send(expensesService.update(expense, data));
}

module.exports = {
  get,
  post,
  getById,
  remove,
  patch,
};
