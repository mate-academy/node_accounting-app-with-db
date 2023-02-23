'use strict';

const { expenseService } = require('../services/expenses.service');
const { userService } = require('../services/users.service');

const getAll = async(request, response) => {
  const params = request.query;

  const foundExpenses = await expenseService
    .getAll(params);

  response.send(foundExpenses);
};

const create = async(request, response) => {
  const params = request.body;

  const foundUser = await userService.findById(params.userId);

  const isCorrectParams = !(
    params.userId
    || params.userId
    || typeof params.userId !== 'number'
    || typeof params.title !== 'string'
    || typeof params.amout !== 'number'
    || typeof params.spentAt !== 'string'
  );

  if (!foundUser || isCorrectParams) {
    response.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(params);

  response.statusCode = 201;
  response.send(newExpense);
};

const getOne = async(request, response) => {
  const id = Number(request.params.id);
  const expense = await expenseService.getById(id);

  if (!expense) {
    response.sendStatus(404);

    return;
  }

  response.send(expense);
};

const remove = async(request, response) => {
  const { id } = request.params;

  if (isNaN(id)) {
    response.sendStatus(400);

    return;
  }

  try {
    await expenseService.remove(id);

    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(404);
  }
};

const update = async(request, response) => {
  const id = Number(request.params.id);
  const params = request.body;

  try {
    await expenseService.update(id, params);

    response.send(await expenseService.getById(id));
  } catch (error) {
    response.sendStatus(404);
  }
};

module.exports.expenseController = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
