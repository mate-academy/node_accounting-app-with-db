/* eslint-disable no-useless-return */
/* eslint-disable no-console */
const expenseService = require('../services/expenseService');

const getExpenses = async (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    let expensesResult = await expenseService.getAllExpenses();

    if (userId) {
      expensesResult = expensesResult.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      expensesResult = expensesResult.filter(
        (expense) => expense.category === categories,
      );
    }

    if (from && to) {
      expensesResult = expensesResult.filter(
        (expense) =>
          new Date(from) <= new Date(expense.spentAt) &&
          new Date(to) >= new Date(expense.spentAt),
      );
    }

    res.status(200).json(expensesResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Iternal Server Error' });
  }
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};
const updateExpense = async (req, res) => {
  const { id } = req.params;

  const checkExpense = await expenseService.getExpensesById(id);

  if (!checkExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expenseService.updateExpense(id, req.body);

  if (!newExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(newExpense);
};

const deletExpense = async (req, res) => {
  const { id } = req.params;

  const checkExpense = await expenseService.getExpensesById(id);

  if (!checkExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.removeExpense(id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deletExpense,
};
