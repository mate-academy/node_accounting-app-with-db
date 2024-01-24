'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getExpenses({
    userId,
    categories,
    from,
    to,
  });

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const create = async(req, res) => {
  const props = req.body;

  const requiredFields = ['userId', 'title', 'amount', 'category', 'spentAt'];

  const isValidRequest = requiredFields.every((field) =>
    props.hasOwnProperty(field)
  );

  if (!isValidRequest) {
    return res.status(400).send('Missing required fields');
  }

  if (!(await usersService.getUserById(props.userId))) {
    return res.status(400).send('There is no such a user in db');
  }

  const expense = await expensesService.createExpense(props);

  res.status(201).send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const props = req.body;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, props);

  res.status(204).send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
