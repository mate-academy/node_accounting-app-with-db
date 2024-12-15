const { expenseService } = require('../services/expense.service.js');
const { userService } = require('../services/user.service.js');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const categoryList = categories ? categories.split(',') : [];

  const expenses = await expenseService.getExpenses({
    userId,
    categoryList,
    from,
    to,
  });

  res.json(expenses);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  const user = await userService.getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getExpenseById = async (req, res) => {
  const expense = await expenseService.getExpenseById(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const updateExpense = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const normalizedId = +id;

  const expense = await expenseService.getExpenseById(normalizedId);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expenseService.updateExpense({
    id: normalizedId,
    data,
  });

  res.json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const expense = await expenseService.deleteExpense(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const expenseController = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};

module.exports = {
  expenseController,
};
