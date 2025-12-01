const expensesService = require('../services/expensesService');

const userService = require('../services/usersService');

async function getExpenses(req, res) {
  const result = await expensesService.getAllExpenses(req.query);

  res.status(200).send(result);
}

async function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !title || !amount) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
}

async function getExpense(req, res) {
  const expense = await expensesService.getExpenseById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.status(200).send(expense);
}

async function deleteExpense(req, res) {
  const deleted = await expensesService.deleteExpense(req.params.id);

  if (!deleted) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
}

async function updateExpense(req, res) {
  const updated = await expensesService.updateExpense(req.params.id, req.body);

  if (!updated) {
    return res.sendStatus(404);
  }
  res.status(200).send(updated);
}

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
