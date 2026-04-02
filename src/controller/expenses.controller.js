const expensesServices = require('../services/expenses.services');
const usersService = require('../services/users.services');

async function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesServices.getExpenses({
    userId: +userId,
    categories,
    from,
    to,
  });

  res.send(expenses);
}

async function getExpenseById(req, res) {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const expense = await expensesServices.getExpenseById(+id);

  if (!expense) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.send(expense);
}

async function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const userExist = await usersService.getUserById(+userId);

  if (!userExist) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  if (
    userId == null ||
    !spentAt ||
    !title ||
    amount == null ||
    isNaN(+amount) ||
    !category
  ) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const newExpense = await expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpense);
}

async function deleteExpense(req, res) {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const wasDeleted = await expensesServices.deleteExpense(+id);

  if (!wasDeleted) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(204).send();
}

async function updateExpense(req, res) {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const expenseExist = await expensesServices.getExpenseById(+id);

  if (!expenseExist) {
    return res.status(404).json({ message: 'Not found' });
  }

  const { spentAt, title, amount, category, note } = req.body;

  if (
    spentAt === undefined &&
    title === undefined &&
    amount === undefined &&
    category === undefined &&
    note === undefined
  ) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const updatedExpense = await expensesServices.updateExpense({
    id: +id,
    ...req.body,
  });

  if (!updatedExpense) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.send(updatedExpense);
}

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
