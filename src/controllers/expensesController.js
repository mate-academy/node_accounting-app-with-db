const expenseService = require('../services/expensesService');
const usersService = require('../services/usersService');

const create = async (req, res) => {
  const expenseData = req.body;

  if (
    expenseData.userId == null ||
    expenseData.spentAt == null ||
    expenseData.title == null ||
    expenseData.amount == null
  ) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const user = await usersService.getUserById(expenseData.userId);

  if (!user) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  const expense = await expenseService.createExpense(expenseData);

  return res.status(201).json(expense);
};

const getAll = async (req, res) => {
  const expenses = await expenseService.getAllExpenses(req.query);

  return res.status(200).json(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.status(200).json(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const deleted = await expenseService.deleteExpense(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const expenseData = req.body;

  const expense = await expenseService.updateExpense(id, expenseData);

  if (!expense) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.status(200).json(expense);
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  update,
};
