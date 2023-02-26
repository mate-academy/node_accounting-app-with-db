'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const searchParams = req.query;

  const expenses = await expensesService.getAll(searchParams);

  res.send(expenses.map(expensesService.normalize));
};

const findById = async(req, res) => {
  const { expenseId } = req.params;

  const wantedExpense = await expensesService.findById(expenseId);

  if (!wantedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.normalize(wantedExpense));
};

const create = async(req, res) => {
  const
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

  const user = await usersService.findById(userId);

  const isDataValid = user
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string'
    && typeof spentAt === 'string'
    && typeof note === 'string';

  if (!isDataValid) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;

  const newExpense = await expensesService.create(expenseData);

  res.statusCode = 201;
  res.send(expensesService.normalize(newExpense));
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const { title, amount, category, note, spentAt } = req.body;
  const wantedExpense = await expensesService.findById(expenseId);

  if (!wantedExpense) {
    res.sendStatus(404);

    return;
  }

  if (title && typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (amount && typeof amount !== 'number') {
    res.sendStatus(400);

    return;
  }

  if (category && typeof category !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (note && typeof note !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (spentAt && typeof spentAt !== 'string') {
    res.sendStatus(400);

    return;
  }

  const dataToUpdate = req.body;

  const updatedExpense = await expensesService.update(expenseId, dataToUpdate);

  res.send(expensesService.normalize(updatedExpense));
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const wantedExpense = await expensesService.findById(expenseId);

  if (!wantedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
