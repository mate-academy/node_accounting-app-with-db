/* eslint-disable no-console */
'use strict';

const { expensesService } = require('../services/expenses.service.js');
const { userService } = require('../services/user.service.js');

const get = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || amount < 0 || !category || !note) {
    res.sendStatus(400);

    return;
  }

  try {
    await userService.getById(userId);
  } catch (error) {
    console.log('User not found');
    res.sendStatus(400);

    return;
  }

  if (!(new Date(spentAt) instanceof Date)
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create(req.body);

  res.statusCode = 201;

  res.send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (
    (spentAt && !(new Date(spentAt) instanceof Date))
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
    || (note && typeof note !== 'string')
  ) {
    res.sendStatus(422);

    return;
  }

  try {
    await expensesService.update(id, req.body);
  } catch (error) {
    console.log('Cannot update expense');
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.getById(id);

  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  try {
    await expensesService.getById(id);
  } catch (error) {
    console.log('Expenses not found');
    res.sendStatus(400);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

module.exports.expensesController = {
  get,
  getOne,
  create,
  update,
  remove,
};
