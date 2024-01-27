'use strict';

const {
  getExpensesAll,
  getExpensesById,
  createExpenses,
  removeExpensesService,
  updateExpenseService,
  normalizeExpense,
}
  = require('../services/expensesService');
const { getById } = require('../services/usersService');

const getExpenses = async(req, res) => {
  const {
    userId, categories, from, to,
  } = req.query;
  const expenses = await getExpensesAll({
    userId, categories, from, to,
  });

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.send(expenses.map(expense => normalizeExpense(expense)));
};

const getOnceExpenses = (req, res) => {
  const { id } = req.params;
  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(normalizeExpense(expense));
};

const creatNewExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const findUser = getById(+userId);

  if (!findUser) {
    res.sendStatus(400);

    return;
  }

  const expense = createExpenses(
    userId, spentAt, title, amount, category, note,
  );

  res.statusCode = 201;
  res.send(expense);
};
const updateExpense = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id) || !req.body) {
    res.sendStatus(400);

    return;
  }

  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newUpdateExpense = updateExpenseService(
    id, req.body);

  if (!newUpdateExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(newUpdateExpense);
};

const removeExpenses = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(204);

    return;
  }

  const expense = getExpensesById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  removeExpensesService(+id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOnceExpenses,
  creatNewExpenses,
  updateExpense,
  removeExpenses,
};
