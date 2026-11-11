const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(
      (expenseItem) => expenseItem.userId === Number(userId),
    );
  }

  if (categories) {
    expenses = expenses.filter(
      (expenseItem) => expenseItem.category === categories,
    );
  }

  if (from) {
    expenses = expenses.filter(
      (expenseItem) => new Date(expenseItem.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expenseItem) => new Date(expenseItem.spentAt) <= new Date(to),
    );
  }

  res.json(expenses);
};

const getOneExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const spentAt = req.body.spentAt;
  const amount = req.body.amount;
  const category = req.body.category;
  const note = req.body.note;

  if (!userId || !title || !spentAt || !amount) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create({
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const deleteOneExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(id);
  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id,
    ...req.body,
  });

  res.json(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  deleteOneExpense,
  updateExpense,
};
