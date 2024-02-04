'use strict';

const expenseService = require('../services/expense.service');

const get = async(request, response) => {
  if (request.query.userId) {
    request.query.userId = parseInt(request.query.userId);
  }

  const expenses = await expenseService.getExpenses(request.query);

  response.send(expenses);
};

const getOne = async(request, response) => {
  const { id } = request.params;
  const expense = await expenseService.getExpenseById(parseInt(id));

  if (!expense) {
    return response.sendStatus(404);
  }

  response.send(expense);
};

const create = async(request, response) => {
  const { userId, title } = request.body;

  if (!userId || !title) {
    return response.sendStatus(400);
  }

  const expense = await expenseService.createExpense(request.body);

  if (!expense) {
    return response.sendStatus(400);
  }

  response.status(201);
  response.send(expense);
};

const update = async(request, response) => {
  const { id } = request.params;

  if (!request.body) {
    return response.sendStatus(400);
  }

  // eslint-disable-next-line max-len
  const expense = await expenseService.updateExpenseById(parseInt(id), request.body);

  if (!expense) {
    return response.sendStatus(404);
  }

  response.send(expense);
};

const remove = async(request, response) => {
  const { id } = request.params;

  const deletedExpense = await expenseService.deleteExpenseById(parseInt(id));

  if (!deletedExpense) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
