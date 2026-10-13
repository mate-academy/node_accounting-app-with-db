/* eslint-disable no-console */
const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const requiredFields = ['userId', 'spentAt', 'title', 'amount'];

const create = async (request, response) => {
  const fields = request.body;

  if (requiredFields.some((key) => !fields[key])) {
    response.sendStatus(400);

    return;
  }

  const [[user]] = await userService.get(fields.userId);

  if (!user) {
    response.sendStatus(400);

    return;
  }

  const [[result]] = await expensesService.create(fields);

  response.status(201).send(result);
};

const getAll = async (request, response) => {
  const [result] = await expensesService.getAll(request.query);

  response.status(200).send(result);
};

const get = async (request, response) => {
  const { id } = request.params;

  const [[result]] = await expensesService.get(id);

  if (!result) {
    response.sendStatus(404);

    return;
  }

  response.status(200).send(result);
};

const patch = async (request, response) => {
  const { id } = request.params;

  const [[result]] = await expensesService.patch(id, request.body);

  if (!result) {
    response.sendStatus(404);

    return;
  }

  response.status(200).send(result);
};

const remove = async (request, response) => {
  const { id } = request.params;

  const [, { rowCount }] = await expensesService.remove(id);

  if (!rowCount) {
    response.sendStatus(404);

    return;
  }

  response.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  get,
  patch,
  remove,
};
