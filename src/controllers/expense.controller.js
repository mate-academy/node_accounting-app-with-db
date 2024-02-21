'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  if (userId || categories || from || to) {
    const parsedId = parseInt(userId, 10);

    if (userId && isNaN(parsedId)) {
      res.sendStatus(400);

      return;
    }

    const expensesByQueries = await expenseService.getByQueries(req.query);

    res.send(expensesByQueries);

    return;
  }

  const allExpenses = await expenseService.getAll();

  res.send(allExpenses);
};

const getOne = async(req, res) => {
  const { parsedId } = req;

  const expense = await expenseService.getById(parsedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await userService.getById(userId);
  const isDateValid = !isNaN(Date.parse(spentAt));

  if (!user
    || !isDateValid
    || typeof title !== 'string'
    || typeof amount !== 'number') {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const remove = async(req, res) => {
  const { parsedId } = req;

  const expense = expenseService.getById(parsedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(parsedId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { parsedId } = req;
  const { title, amount, category, note } = req.body;

  const expense = await expenseService.getById(parsedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if ((title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
    || (note && typeof note !== 'string')) {
    res.sendStatus(400);

    return;
  }

  const expenseToUpdate = {
    ...expense,
    ...req.body,
  };

  await expenseService.update(parsedId, expenseToUpdate);

  const updatedExpense = await expenseService.getById(parsedId);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  remove,
  update,
  create,
};
