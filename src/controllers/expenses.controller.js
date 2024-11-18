const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAllExpenses = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses);
};

const getExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const createExpense = async (req, res) => {
  const { spentAt, title, amount, category, userId } = req.body;

  if (!spentAt || !title || !amount || !category || !userId) {
    return res.sendStatus(400);
  }

  if (!usersService.getById(Number(req.body.userId))) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(req.body);

  res.status(201).send(expense);
};

const deleteById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(id);

  res.sendStatus(204);
};

const updateById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.updateById(id, req.body);

  res.json(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteById,
  updateById,
};
