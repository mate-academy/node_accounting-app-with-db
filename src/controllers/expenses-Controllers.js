const expensesService = require('../services/expenses-Services');
// const expensesControllers = require('../services/expenses-Services')

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expensesService.getAllExpenses(userId, categories, from, to);

  res.status(200).json(expenses);
};

const getExpensById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(+id);

  if (!expense) {
    return res.status(400).send('Expense not found');
  }

  res.status(200).json(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  //  maybe add try {}
  const createExp = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!userId || !spentAt || title || amount || category || note) {
    return res.status(400).send('Missing required fields');
  }

  res.status(201).json(createExp);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.deleteExpense(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.status(200).json(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;

  const updateExp = expensesService.updateExpense(+id, updatedExpense);

  if (!updateExp) {
    return res.status(404).send('Expense not found');
  }
  res.status(200).json(updateExp);
};

const expensesController = {
  updateExpense,
  deleteExpense,
  createExpense,
  getExpensById,
  getAllExpenses,
};

module.exports = expensesController;
