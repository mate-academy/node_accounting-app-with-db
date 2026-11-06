const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.json(expenses);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const create = async (req, res) => {
  const expenseBody = req.body;
  const { spentAt, title, amount, userId } = expenseBody;

  if (!spentAt || !title || !amount || !userId) {
    return res.sendStatus(400);
  }

  const userIdNormalized = Number(userId);
  const user = await usersService.getById(userIdNormalized);

  if (!user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(expenseBody);

  res.status(201).json(expense);
};

const deleteOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const expenseBody = req.body;
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.update({
    id,
    expenseBody,
  });

  const updatedExpense = await expensesService.getById(id);

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};
