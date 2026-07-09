const expensesModel = require('../models/Expense.model.js');
const userModel = require('../models/User.model.js');

const getAllExpenses = async (req, res) => {
  const expenses = await expensesModel.getAllExpenses(req.query);

  res.json(expenses.map(expensesModel.normalize));
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesModel.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expensesModel.normalize(expense));
};

const createExpense = async (req, res) => {
  const { userId, title, amount, category, spentAt, note } = req.body;

  if (!userId || !title || amount === undefined || !spentAt) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await userModel.getUserById(userId);

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const newExpense = await expensesModel.createExpense({
    userId,
    title,
    amount,
    category,
    spentAt,
    note,
  });

  res.status(201).json(expensesModel.normalize(newExpense));
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesModel.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesModel.updateExpense(id, req.body);

  const updated = await expensesModel.getExpenseById(id);

  res.json(expensesModel.normalize(updated));
};

const removeExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesModel.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  await expensesModel.removeExpense(id);
  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
