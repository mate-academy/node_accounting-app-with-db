'use strict';

const expensesServices = require('../services/expenses.js');
const { checkUuid, makeValidDate } = require('../utils/functions.js');

async function getAll(req, res) {
  const selectedUserId = req.query.userId;
  const { category, from, to } = req.query;

  const paramsData = {
    userId: selectedUserId,
    category,
    from: makeValidDate(from),
    to: makeValidDate(to),
  };

  const paramsAreExists = Object.keys(paramsData)
    .some(key => paramsData[key] !== undefined);

  try {
    const filteredExpenses = paramsAreExists
      ? await expensesServices.findAll(paramsData)
      : await expensesServices.getAll();

    res.status(200).send(filteredExpenses);

    return;
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getExpense(req, res) {
  const expenseId = req.params.expenseId;

  if (checkUuid(expenseId)) {
    res.sendStatus(400);

    return;
  }

  try {
    const expenseById = await expensesServices.getExpense(expenseId);

    if (!expenseById) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expenseById);

    return;
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expenseData = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  try {
    const isDataInvalid = await expensesServices.isDataInvalid(expenseData);

    if (isDataInvalid) {
      res.sendStatus(400);

      return;
    }

    const newExpanse = await expensesServices.addExpense(expenseData);

    res.status(201).send(newExpanse);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

async function updateExpense(req, res) {
  const expenseId = req.params.expenseId;

  let expenseToUpdate;

  try {
    expenseToUpdate = await expensesServices.getExpense(expenseId);
  } catch (err) {
    res.sendStatus(404).send(err.message);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const normalizedData = {
    spentAt: spentAt || expenseToUpdate.spentAt,
    title: title || expenseToUpdate.title,
    amount: amount || expenseToUpdate.amount,
    category: category || expenseToUpdate.category,
    note: note || expenseToUpdate.note,
  };

  try {
    const updatedExpense
      = await expensesServices.updateExpense(expenseId, normalizedData);

    res.status(200).send(updatedExpense);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

async function removeExpense(req, res) {
  const expenseId = req.params.expenseId;

  try {
    await expensesServices.removeExpense(expenseId);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400).send(err.message);
  }
}

module.exports = {
  getAll,
  getExpense,
  addExpense,
  removeExpense,
  updateExpense,
};
