/* eslint-disable no-console */

const { expensesService } = require('../services/expense.service');
const { usersService } = require('../services/user.service');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(200).json(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'No such expense' });
  }

  res.send(expense);
};

const create = async (req, res) => {
  const expense = req.body;

  if (
    !expense.spentAt ||
    !expense.title ||
    !expense.amount ||
    !expense.userId
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await usersService.getById(expense.userId);

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  const newExpense = await expensesService.createExpense(expense);

  res.status(201).json(newExpense);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'No such expense' });
  }

  const updatedExpense = await expensesService.update({
    id,
    body: req.body,
  });

  res.send(updatedExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ error: 'No such expense' });
  }

  await expensesService.deleteById(id);

  res.sendStatus(204);
};

const expensesController = {
  getAll,
  getOne,
  create,
  update,
  removeExpense,
};

module.exports = {
  expensesController,
};
