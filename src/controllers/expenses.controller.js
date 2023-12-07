'use strict';

const expenseService = require('./../services/expenses.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const {
  validateCreateExpense,
  validateUpdateExpense,
} = require('../validation/validateExpense');

const get = async(req, res) => {
  const { userId, from, to, categories } = req.query;

  res.send(await expenseService.getExpenses(userId, from, to, categories));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    return notFoundResponse(res, 'Expense');
  }

  res.send(expense);
};

const create = async(req, res) => {
  const expenseData = req.body;

  if (validateCreateExpense(res, expenseData) === 'Valid') {
    try {
      const newExpense = await expenseService.create(expenseData);

      return res.status(201).json(newExpense);
    } catch (_) {
      return notFoundResponse(res, 'User');
    }
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getById(id))) {
    return notFoundResponse(res, 'Expense');
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  if ((await validateUpdateExpense(res, id, dataToUpdate)) === 'Valid') {
    await expenseService.update(id, dataToUpdate);

    res.send(await expenseService.getById(id));
  }
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
