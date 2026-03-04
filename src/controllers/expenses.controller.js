const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (!spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(req.body);

  res.status(201).json(expense);
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const deleteOne = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const expense = await expensesService.getById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.update(req.params.id, req.body);

  const updatedExpense = await expensesService.getById(req.params.id);

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};
