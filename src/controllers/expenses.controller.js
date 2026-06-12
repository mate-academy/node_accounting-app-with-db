const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

async function getAllExpenses(req, res) {
  const expenses = await expensesService.getAllExpenses(req.query);

  return res.send(expenses);
}

async function createExpense(req, res) {
  const { userId, title, amount } = req.body;

  if (userId == null || title == null || amount == null) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.createExpense(req.body);

  res.statusCode = 201;

  res.send(expense);
}

async function getExpenseById(req, res) {
  const id = Number(req.params.id);

  const expenseById = await expensesService.getExpenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(expenseById);
}

async function deleteExpense(req, res) {
  const id = Number(req.params.id);

  const result = await expensesService.deleteExpense(id);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
}

async function updateExpense(req, res) {
  const id = Number(req.params.id);

  const expenseForUpdate = await expensesService.updateExpense(id, req.body);

  if (!expenseForUpdate) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(expenseForUpdate);
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
