'use strict';

const { Op } = require('sequelize');
const expensesService = require('../services/expenses');

const create = async(req, res) => {
  try {
    const expense = await expensesService.create(req.body);

    res.statusCode = 201;
    res.send(expense);
  } catch (error) {
    res.statusCode = 400;
    res.send('Enter all fields');
  }
};

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const filters = {};

  if (userId) {
    filters.userId = userId;
  }

  if (categories) {
    filters.category = categories;
  }

  if (from && to) {
    filters.createdAt = { [Op.between]: [from, to] };
  }

  try {
    const expenses = await expensesService.getAll(filters);

    res.send(expenses);
  } catch (error) {
    res.statusCode = 400;
    res.send('There are error in parameters');
  }
};

const getById = async(req, res) => {
  const foundExpense = await expensesService.getById(req.params.expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  res.send(foundExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  try {
    const updatedExpense = await expensesService.update(expenseId, req.body);

    res.send(updatedExpense);
  } catch (error) {
    res.statusCode = 400;
    res.send('There are error in request body');
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
