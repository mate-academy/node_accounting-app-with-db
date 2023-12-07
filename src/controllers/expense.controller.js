'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Expected entity does not exist';
const REQUIRED_CODE = 400;
const REQUIRED_MESSAGE = 'Required parameter is not passed';

const expenseKeys = [
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseService.getAllExpenses({
    userId,
    categories,
    from,
    to,
  });

  res.send(expenses.map(expense => expenseService.normalize(expense)));
};

const create = (req, res) => {
  const payload = req.body;
  const postExpenseKeys = ['userId', ...expenseKeys];

  const user = userService.getUser(payload.userId);

  const missingKeys = postExpenseKeys
    .filter(key => !payload.hasOwnProperty(key));

  if (missingKeys.length || !user) {
    res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

    return;
  }

  res.statusCode = 201;
  res.send(expenseService.createExpense(payload));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

    return;
  }

  res.send(expenseService.normalize(expense));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpense(id)) {
    res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

    return;
  }

  expenseService.deleteExpense(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const expense = expenseService.getExpense(id);

  if (!expense) {
    res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

    return;
  }

  if (!payload.hasOwnProperty('title')) {
    res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

    return;
  }

  expenseService.updateExpense({
    expense,
    payload,
  });

  res.send(expenseService.normalize(expense));
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
