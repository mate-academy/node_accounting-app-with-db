'use strict';

const categoryService = require('../services/categories.js');
const expenseService = require('../services/expenses.js');
const userService = require('../services/user.js');

const getAll = async(req, res) => {
  const query = req.query;
  const expenses = await expenseService.getAll(query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.status(404).send('Not Found');

    return;
  }

  res.send(foundExpense);
};

const addOne = async(req, res) => {
  const { userId, spentAt, title, amount, categoryId, note } = req.body;

  if (typeof title !== 'string'
  || typeof userId !== 'string'
  || typeof categoryId !== 'string'
  || typeof note !== 'string'
  || typeof amount !== 'number'
  || typeof spentAt !== 'string') {
    res.status(422).send('fiil all required fields');

    return;
  }

  const foundUser = await userService.getOne(userId);
  const foundCategory = await categoryService.getOne(categoryId);

  if (!foundUser) {
    res.status(404).send('User is not found');

    return;
  }

  if (!foundCategory) {
    res.status(404).send('Category is not found');

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
  const foundExpense = await expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense is not found');

    return;
  }

  const { body } = req;

  if (!body) {
    res.status(422).send('Fill the data');

    return;
  }

  const updatedExpense = await expenseService.updateOne(expenseId, body);

  res.status(200).send(updatedExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getOne(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense not Found');

    return;
  }

  expenseService.deleteOne(expenseId);

  res.status(204).send();
};

module.exports = {
  getAll, getOne, addOne, update, remove,
};
