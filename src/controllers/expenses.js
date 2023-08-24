'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');
const categoryService = require('../services/categories.js');

const getAll = async(req, res) => {
  const query = req.query;
  const expenses = await expenseService.getAll(query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Not Found');

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const { userId, spentAt, title, amount, categoryId, note } = req.body;

  if (typeof title !== 'string'
  || typeof userId !== 'string'
  || typeof categoryId !== 'string'
  || typeof note !== 'string'
  || typeof amount !== 'number'
  || typeof spentAt !== 'string') {
    res.status(400).send('Pass all required fields');

    return;
  }

  const foundUser = await userService.getById(userId);
  const foundCategory = await categoryService.getById(categoryId);

  if (!foundUser) {
    res.status(400).send('User is not found');

    return;
  }

  if (!foundCategory) {
    res.status(400).send('Category is not found');

    return;
  }

  const newExpense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    categoryId,
    note,
  });

  res.status(201).send(newExpense);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense is not found');

    return;
  }

  const { body } = req;

  if (!body) {
    res.status(400).send('No data to update');

    return;
  }

  const updatedExpense = await expenseService.update(expenseId, body);

  res.status(200).send(updatedExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Not Found');

    return;
  }

  expenseService.remove(expenseId);

  res.status(204).send();
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
