'use strict';

const expensesService = require('../services/expenses');

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAllExpenses();

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(exp => exp.userId === +userId);
  };

  if (categories) {
    filteredExpenses = expenses
      .filter(exp => categories.includes(exp.categories));
  };

  if (from) {
    filteredExpenses = expenses
      .filter(exp => new Date(from) <= new Date(exp.spentAt));
  };

  if (to) {
    filteredExpenses = expenses
      .filter(exp => new Date(to) >= new Date(exp.spentAt));
  };

  res.send(filteredExpenses);
};

const addExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !category || !amount || !note) {
    res.sendStatus(400);

    return;
  }

  const newExp = await expensesService.createExpense(
    userId, spentAt, title, amount, category, note
  );

  res.status(201);
  res.send(newExp);
};

const getOneExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getExpenseByID(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  res.status(200);
  res.send(foundExpense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpenses = await expensesService.getExpenseByID(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const foundExp = await expensesService.getExpenseByID(expenseId);

  if (!foundExp) {
    res.sendStatus(404);

    return;
  };

  expensesService.updatedExpense({
    expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExp);
};

module.exports = {
  getAll,
  addExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
};
