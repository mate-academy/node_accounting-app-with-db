'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

const expenseInterface = {
  userId: 0,
  title: '',
  amount: 0,
  category: '',
  note: '',
};

const checkExpense = (expense) => {
  const interfaceKeys = JSON.stringify(Object.keys(expenseInterface).sort());
  const expenseKeys = JSON.stringify(Object.keys(expense).sort());

  return interfaceKeys === expenseKeys;
};

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    return res.status(400).send('Id is required');
  }

  const expense = await expensesService.getOne(parseInt(id));

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const add = async(req, res) => {
  const expenseToAdd = { ...req.body };

  if (!checkExpense(expenseToAdd) || !userService.getOne(expenseToAdd.userId)) {
    return res.status(400).send('Bad request');
  }

  const expense = await expensesService.add(expenseToAdd);

  res.status(201).send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const expenseData = { ...req.body };

  const expense = await expensesService.update(parseInt(id), expenseData);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const wasRemoved = await expensesService.remove(parseInt(id));

  if (!wasRemoved) {
    return res.status(404).send('Expense not found');
  }

  res.status(204).send('');
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
