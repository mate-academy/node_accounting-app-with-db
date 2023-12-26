'use strict';

const expenseService = require('../services/expenses.service');

const get = async(req, res) => {
  res.send(await expenseService.getExpenses(req.body));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = async(req, res) => {
  const expense = req.body;

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await expenseService.addExpense(expense);

    res.status(201).json(newExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    await expenseService.deleteExpense(id);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const newProperties = req.body;

  if (!id) {
    res.sendStatus(400);
  }

  const updatedExpense = await expenseService
    .updateExpense(id, newProperties);

  res.send(updatedExpense);
};

module.exports = {
  get, getOne, add, remove, update,
};
