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
    res.statusCode = 404;
    res.send('Not Found');

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const { userId, spentAt, title, amount, categoryId, note } = req.body;

  if (typeof title !== 'string'
  || typeof userId !== 'number'
  || typeof categoryId !== 'number'
  || typeof note !== 'string'
  || typeof amount !== 'number'
  || typeof spentAt !== 'string') {
    res.statusCode = 400;
    res.send('Pass all required fields');

    return;
  }

  const foundUser = await userService.getById(+userId);
  const foundCategory = await categoryService.getById(+categoryId);

  if (!foundUser) {
    res.statusCode = 400;
    res.send('User is not found');

    return;
  }

  if (!foundCategory) {
    res.statusCode = 400;
    res.send('Category is not found');

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

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense is not found');

    return;
  }

  const { body } = req;

  const updatedExpense = await expenseService.update(expenseId, body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Not Found');

    return;
  }

  expenseService.remove(expenseId);

  res.status(204).send();
};

module.exports = {
  getAll,
  getOne,
  add,
  updateExpense,
  remove,
};
