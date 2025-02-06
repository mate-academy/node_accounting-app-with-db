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
  // eslint-disable-next-line no-unused-vars
  const { spentAt, title, amount, userId } = req.body;

  const user = await usersService.getById(Number(userId));

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  const expense = await expensesService.create(req.body);

  res.status(201).json(expense);
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

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      message: 'Name is required and must be at least 2 characters long.',
    });
  }

  const user = await usersService.create({ name });

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const { name: newName } = req.body;

  if (!newName || newName.trim().length < 2) {
    return res.status(400).json({
      message: 'Name is required and must be at least 2 characters long.',
    });
  }

  const updatedUser = await usersService.updateById(id, { name: newName });

  res.json(updatedUser);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteById,
  updateById,
  createUser,
  updateUser,
};
