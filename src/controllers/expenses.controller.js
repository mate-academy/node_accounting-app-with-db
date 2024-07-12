const services = require('../services/expenses.service.js');
const { getUserByIdService } = require('../services/users.service.js');

const getAllExpenses = async (req, res) => {
  const expenses = await services.getAllExpenseService(req.query);

  res.json(expenses);
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await services.getExpenseByIdService(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({ error: 'Invalid expense data' });
  }

  const user = await getUserByIdService(data.userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const newExpense = await services.createExpenseService(data);

  res.status(201).json(newExpense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expense = await services.getExpenseByIdService(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await services.updateExpenseService(id, title);

  res.json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await services.getExpenseByIdService(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await services.deleteExpenseService(id);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
