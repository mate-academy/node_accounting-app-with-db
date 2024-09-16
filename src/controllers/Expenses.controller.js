'use strict';

const codeStatuses = require('../helpers/statusCode');
const expenseService = require('../services/Expense.Service');
const userService = require('../services/User.Service');

async function getAll(req, res) {
  const { userId, categories, from, to } = req.query;

  const userExpenses = await expenseService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(codeStatuses.OK);
  res.send(userExpenses);
}

async function getById(req, res) {
  const { id } = req.params;

  const expense = await expenseService.getExpenseById(+id);

  if (!expense) {
    res.sendStatus(codeStatuses.NOT_FOUND);

    return;
  }

  res.status(codeStatuses.OK);
  res.send(expense);
}

async function create(req, res) {
  const { userId, title, spentAt } = req.body;

  if (!title || !spentAt) {
    res.send(codeStatuses.BAD_REQUEST);

    return;
  }

  const user = await userService.getUserById(+userId);

  if (!user) {
    res.send(codeStatuses.BAD_REQUEST);

    return;
  }

  const newExpense = await expenseService.createExpense(req.body);

  res.status(codeStatuses.CREATED);
  res.send(newExpense);
}

async function update(req, res) {
  const { id } = req.params;

  const expenseToUpdate = await expenseService.getExpenseById(+id);

  if (!expenseToUpdate) {
    res.send(codeStatuses.NOT_FOUND);

    return;
  }

  await expenseService.updateExpense(req.body, +id);

  const updatedExpense = await expenseService.getExpenseById(+id);

  res.status(codeStatuses.OK);
  res.send(updatedExpense);
}

async function remove(req, res) {
  const { id } = req.params;

  const expense = await expenseService.deleteExpense(+id);

  if (!expense) {
    res.send(codeStatuses.NOT_FOUND);

    return;
  }

  await expenseService.deleteExpense(+id);

  res.sendStatus(codeStatuses.OK);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
