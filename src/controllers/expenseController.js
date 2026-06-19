const expenseService = require('../services/expense.service');
const { User } = require('../models/User.model');

const requestProperties = ['userId', 'spentAt', 'title', 'amount'];

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseService.getExpenses(
    userId,
    categories,
    from,
    to,
  );

  return res.json(expenses);
};

const getExpenseById = (req, res) => {
  return res.json(req.expense);
};

const createExpense = async (req, res) => {
  const hasAllFields = requestProperties.every((property) => {
    return req.body.hasOwnProperty(property);
  });

  if (!req.body.userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  const isUserExist = await User.findByPk(+req.body.userId);

  if (!hasAllFields || !isUserExist) {
    return res
      .status(400)
      .json({ error: 'No required fields or user not exist' });
  }

  const result = await expenseService.createExpense(req.body);

  return res.status(201).json(result);
};

const deleteExpense = async (req, res) => {
  await expenseService.deleteExpense(+req.params.id);

  return res.status(204).send();
};

const updateExpense = async (req, res) => {
  const result = await expenseService.updateExpense(+req.params.id, req.body);

  return res.status(200).json(result);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
