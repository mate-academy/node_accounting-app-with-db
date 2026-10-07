const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getExpenses = async (req, res) => {
  let expenses = await expenseService.getAllExpenses();

  const { userId, from, to, categories } = req.query;

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === Number(userId));
  }

  if (from) {
    expenses = expenses.filter((expense) => expense.spentAt >= from);
  }

  if (to) {
    expenses = expenses.filter((expense) => expense.spentAt <= to);
  }

  if (categories) {
    const categoryList = categories.split(',');

    expenses = expenses.filter((expense) => {
      return categoryList.includes(expense.category);
    });
  }

  res
    .status(200)
    .json(expenses.map((expense) => expenseService.normalize(expense)));
};

const createExpense = async (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  if (
    userId === undefined ||
    userId === null ||
    !title ||
    amount === undefined ||
    amount === null ||
    !spentAt
  ) {
    return res.sendStatus(400);
  }

  const user = await userService.getUserById(Number(userId));

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = {
    userId: Number(userId),
    title,
    amount: Number(amount),
    category: category || '',
    note: note || null,
    spentAt: spentAt,
  };

  res.status(201).json(await expenseService.createExpense(newExpense));
};

const getExpense = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.status(200).json(expenseService.normalize(expense));
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expenseService.deleteExpense(id);

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const updatedExpense = await expenseService.updateExpense({
      id,
      ...req.body,
    });

    if (!updatedExpense) {
      return res.sendStatus(404);
    }

    return res.status(200).json(expenseService.normalize(updatedExpense));
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
