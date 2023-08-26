'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

async function getExpenses(req, res) {
  const expenses = await expensesService.getAll();

  if (!expenses) {
    res.status(404).send({ message: 'Expenses not found' });

    return;
  }

  return expenses;
}

async function getExpense(req, res) {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    res.status(422).send({ message: 'Invalid expense id' });

    return;
  }

  const foundExpense = await expensesService.getById(+expenseId);

  if (!foundExpense) {
    res.status(404).send({ message: 'Expenses not found' });

    return;
  }

  res.send(
    expensesService.normalize(foundExpense),
  );
}

async function createExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = await usersService.getById(+userId);

  if (!foundUser) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || null,
  });

  if (!newExpense) {
    res.status(500).send({ message: 'Database error' });

    return;
  }

  res.status(201).send(
    expensesService.normalize(newExpense),
  );
}

async function updateExpense(req, res) {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    res.status(422).send({ message: 'Invalid expense id' });

    return;
  }

  const foundExpense = await expensesService.getById(+expenseId);

  if (!foundExpense) {
    res.status(404).send({ message: 'Expenses not found' });

    return;
  }

  const { body } = req;

  const updatedExpense = await expensesService.update({
    id: +expenseId,
    body,
  });

  if (!updatedExpense) {
    res.status(500).send({ message: 'Database error' });

    return;
  }

  res.sendStatus(200);
}

async function deleteExpense(req, res) {
  const { expenseId } = req.params;

  if (isNaN(expenseId)) {
    res.status(422).send({ message: 'Invalid expense id' });

    return;
  }

  const foundExpense = await expensesService.getById(+expenseId);

  if (!foundExpense) {
    res.status(404).send({ message: 'Expenses not found' });

    return;
  }

  const deletedExpense = await expensesService.remove(+expenseId);

  if (!deletedExpense) {
    res.status(500).send({ message: 'Database error' });

    return;
  }

  res.sendStatus(204);
}

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
