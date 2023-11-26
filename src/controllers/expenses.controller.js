'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const expensesService = require('../services/expenses.service');
const usersService = require('../services/user.service');
const { Expense } = require('../controllers/db/models/expense.model');

const getById = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    const result = await expensesService.getExpensesById(id);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(expensesService.normalizeExpenseData(result));
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

const gerAllIncludesQuery = async(req, res) => {
  const querys = req.query;

  const modelKeys = Object.keys(Expense.getAttributes());

  for (const query in querys) {
    if (!modelKeys.includes(query)) {
      res.status(404).send(`column ${query} does not exist`);
    }
  }

  try {
    const result = await expensesService.getAllExpenses(querys);

    res.send(result
      .map(expense => expensesService.normalizeExpenseData(expense))
    );
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

const createExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (
    !userId
    || !title
    || !amount
    || !category
    || !(await usersService.getUserById(userId))
  ) {
    res.sendStatus(400);

    return;
  }

  try {
    const createdExpense = await expensesService.createExpenses({
      userId,
      spentAt,
      title,
      category,
      amount,
      note,
    });

    res.send(createdExpense);
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

const deleteParticular = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    await expensesService.deleteExpensesById(id);

    res.send(`one expense with id ${id} was deleted`);
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

const updateParticular = async(req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await expensesService.updateExpensesById(id, req.body);

    if (!updatedUser[0]) {
      res.status(404);
      res.send(updatedUser);

      return;
    }

    res.send(updatedUser);
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

module.exports = {
  getById,
  gerAllIncludesQuery,
  createExpense,
  deleteParticular,
  updateParticular,
};
