const { usersRepository } = require('../user/User.repository');
const { ExpenseRepository } = require('./expense.repository');

const createExpense = async (req, res) => {
  const { spentAt, title, amount, userId, category, note } = req.body;

  if (!userId || !title || !amount) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const user = await usersRepository.getUserById(userId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const expense = await ExpenseRepository.creatExpense({
    spentAt,
    title,
    amount,
    userId,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await ExpenseRepository.getAllExpenses({
    userId,
    categories,
    from,
    to,
  });

  res.json(expenses);
};

const getExpensesById = async (req, res) => {
  const { id } = req.params;

  const expense = await ExpenseRepository.getExpensesById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(200).json(expense);
};

const updateExpenses = async (req, res) => {
  const { id } = req.params;

  const { spentAt, title, amount, category, note } = req.body;

  const expense = await ExpenseRepository.getExpensesById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const updatedExpense = await ExpenseRepository.updateExpenses({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

const removeExpenses = async (req, res) => {
  const { id } = req.params;

  const expense = await ExpenseRepository.getExpensesById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  await ExpenseRepository.removeExpenses(id);
  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpensesById,
  updateExpenses,
  removeExpenses,
};
