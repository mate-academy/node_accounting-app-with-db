'use strict';

const expenseService = require('../services/expense.service.js');
const userService = require('../services/user.service.js');
const { getFilteredExpenses } = require('../utils/getFilteredExpenses.js');

const getAll = async(req, res) => {
  const {
    userId: recivedUserId,
    categories,
    from,
    to,
  } = req.query;
  const userId = Number(recivedUserId);

  const expenses = await expenseService.getAll();

  const filteredExpenses = await getFilteredExpenses(
    expenses,
    userId,
    categories,
    from,
    to,
  );

  res.send(filteredExpenses);
};

const getById = async(req, res) => {
  const { id } = req.params;

  if (!id || Number.isNaN(id) || !isFinite(id) || id <= 0) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.getById(Number(id));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const {
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  } = req.body;

  const user = await userService.getById(userId);

  if (
    !title
    || !user
    || typeof title !== 'string'
    || !userId
    || !isFinite(userId)
    || userId <= 0
    || Number.isNaN(userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create({
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const expenseToRemove = await expenseService.getById(Number(id));

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expenseToRemove.id);

  res.sendStatus(204);
};

const patch = async(req, res) => {
  const { id: recivedId } = req.params;
  const id = Number(recivedId);
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const expenseToUpdate = await expenseService.getById(Number(id));

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expenseService.patch({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 200;

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
};
