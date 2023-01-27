'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const { userId, category, from, to } = req.query;

  const expenses = await expensesService.getAll(
    Number(userId),
    category,
    from,
    to
  );

  res.send(expenses);
};

const getById = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(Number(expenseId))) {
    res.status(400).send('Bad Request. Expense id must be a number');

    return;
  }

  const foundExpense = await expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.status(404).send('Not Found. Expense with this id does not exist');

    return;
  }

  res.send(foundExpense);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const isSomeDataMissed = typeof userId !== 'number'
  || typeof spentAt !== 'string'
  || typeof title !== 'string'
  || typeof amount !== 'number'
  || typeof category !== 'string'
  || typeof note !== 'string';

  if (isSomeDataMissed) {
    res.status(400).send('Bad Request. Some required data are missed');

    return;
  }

  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.status(400).send('Bad Request. Cannot find user with this id');
  }

  const createdExpense = await expensesService
    .create(Number(userId), spentAt, title, Number(amount), category, note);

  res.status(201).send(createdExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(Number(expenseId))) {
    res.status(400).send('Bad Request. Expense id must be a number');

    return;
  }

  const foundExpense = await expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.status(404).send('Not Found. Expense with this id does not exist');

    return;
  }

  await expensesService.remove(Number(expenseId));

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const newData = req.body;

  const foundExpense = await expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.status(404).send('Not Found. Expense with this id does not exist');

    return;
  }

  const updatedExpense = await expensesService
    .update(Number(expenseId), newData);

  res.send(updatedExpense);
};

module.exports = {
  getAll, getById, create, remove, update,
};
