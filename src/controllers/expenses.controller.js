'use strict';

const {
  getExpenses,
  getExpensesById,
  creatEexpenses,
  updatEexpenses,
  deletEexpenses,
} = require('../services/expenses.service');
const { hasRequiredNonEmptyFields } = require('../services/helpers');

const REQUIRED_EXPENSE_FIELDS = ['userId', 'spentAt', 'title', 'amount'];

async function listExpenses(req, res) {
  const expenses = await getExpenses(req.query);

  if (expenses === null) {
    return null;
  }

  res.json(expenses);
}

async function getExpense(req, res) {
  const expense = await getExpensesById(req.params.id);

  if (!expense) {
    return res.status(404).end();
  }

  res.json(expense);
}

async function createExpense(req, res) {
  const body = req.body ?? {};

  if (!hasRequiredNonEmptyFields(body, REQUIRED_EXPENSE_FIELDS)) {
    return res.status(400).end();
  }

  const expense = await creatEexpenses({ ...body });

  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(400).end();
  }
}

async function handleUpdate(req, res) {
  const expense = await updatEexpenses(req.params.id, req.body ?? {});

  if (!expense) {
    return res.status(404).end();
  }

  res.json(expense);
}

async function deleteExpense(req, res) {
  const deleted = await deletEexpenses(req.params.id);

  if (!deleted) {
    return res.status(404).end();
  }

  res.status(204).end();
}

module.exports = {
  listExpenses,
  getExpense,
  createExpense,
  handleUpdate,
  deleteExpense,
};
