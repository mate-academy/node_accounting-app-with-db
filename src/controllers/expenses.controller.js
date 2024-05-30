const expensesServices = require('../services/expenses.service.js');
const usersServices = require('../services/users.service.js');

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(await expensesServices.allExpenses(userId, categories, from, to));
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expenseById = await expensesServices.expenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseById);
};

const createExpense = async (req, res) => {
  const { userId, title, amount, category, spentAt, note } = req.body;

  const user = await usersServices.userById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expenseById = await expensesServices.expenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.deleteExpense(id);

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expenseById = await expensesServices.expenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesServices.updateExpense(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
