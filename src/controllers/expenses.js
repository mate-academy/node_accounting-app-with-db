'use strict';

const expensesService = require('../services/expenses');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expensesService.getAll(userId, categories, from, to);

  res.send(expenses);
}

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).send({ error: 'Expense not found' });
    return;
  }

  res.send(expense);
}

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expenseData = { userId, spentAt, title, amount, category, note };

  try {
    const expense = await expensesService.create(expenseData);

    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }
}

const remove = (req, res) => {
  const { id } = req.params;

  const isDeleted = expensesService.deleteById(id);

  if (!isDeleted) {
    res.status(404).send({ error: 'Expense not found' });
    return;
  }

  res.sendStatus(204);
}

const update = (req, res) => {
  const { id } = req.params;
  const expenseData = req.body;

  const expense = expensesService.update(id, expenseData);

  if (!expense) {
    res.status(404).send({ error: 'Expense not found' });
    return;
  }

  res.send(expense);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
