const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const getExpenses = async (req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  const formatted = expenses.map((exp) => ({
    id: exp.id,
    userId: exp.userId,
    spentAt: exp.spentAt,
    title: exp.title,
    amount: exp.amount,
    note: exp.note,
    category: exp.category?.category || [],
  }));

  res.json(formatted);
};

const getExpenseById = async (req, res) => {
  const id = +req.params.id;
  const expense = await expensesService.getExpenseById(id, true);

  if (!expense) {
    return res.sendStatus(404);
  }

  const response = {
    id: expense.id,
    userId: expense.userId,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    note: expense.note,
    category: expense.category?.category || [],
  };

  res.json(response);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).send('Missing required fields');
  }

  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const expense = await expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });

  const response = {
    id: expense.id,
    userId: expense.userId,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    note: expense.note,
    category: category || [],
  };

  res.status(201).json(response);
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedNumber = await expensesService.updateExpense(id, req.body);

  if (!updatedNumber) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.getExpenseById(id, true);

  const response = {
    id: updatedExpense.id,
    userId: updatedExpense.userId,
    spentAt: updatedExpense.spentAt,
    title: updatedExpense.title,
    amount: updatedExpense.amount,
    note: updatedExpense.note,
    category: updatedExpense.category?.category || [],
  };

  res.json(response);
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  await expensesService.deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
