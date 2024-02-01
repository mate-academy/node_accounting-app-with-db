'use strict';

const expenseService = require('../services/expense.service');
const usersService = require('../services/user.service');

const get = async(req, res) => {
  const allExpenses = await expenseService.getAllExpenses(req);

  return res.send(allExpenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  return res.json(expense);
};

const post = async(req, res) => {
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

  const expense = await expenseService.createExpense(props);

  res.status(201).send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const props = req.body;

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expenseService.updateExpense(id, props);

  res.status(204).send(updatedExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.deleteExpense(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  post,
  update,
  remove,
};
