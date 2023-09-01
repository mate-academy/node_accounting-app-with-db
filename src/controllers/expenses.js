/* eslint-disable no-console */
'use strict';

const { Op } = require('sequelize');
const expensesService = require('../services/expenses');

const create = async(req, res) => {
  try {
    const expense = await expensesService.create(req.body);

    res.statusCode = 201;
    res.send(expense);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const getAll = async(req, res) => {
  try {
    const { userId, categories, from, to } = req.query;
    const filters = {};

    if (userId) {
      filters.userId = { [Op.eq]: userId };
    }

    if (categories) {
      filters.category = { [Op.in]: categories };
    }

    if (from && to) {
      filters.createdAt = { [Op.between]: [from, to] };
    }

    const expenses = await expensesService.getAll(filters);

    res.send(expenses);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const getById = async(req, res) => {
  try {
    const foundExpense = await expensesService.getById(req.params.expenseId);

    if (!foundExpense) {
      res.statusCode = 404;
      res.send('Expense not found');

      return;
    }

    res.send(foundExpense);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const remove = async(req, res) => {
  try {
    const { expenseId } = req.params;
    const foundExpense = await expensesService.getById(expenseId);

    if (!foundExpense) {
      res.statusCode = 404;
      res.send('Expense not found');

      return;
    }

    expensesService.remove(expenseId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

const update = async(req, res) => {
  try {
    const { expenseId } = req.params;
    const foundExpense = await expensesService.getById(expenseId);

    if (!foundExpense) {
      res.statusCode = 404;
      res.send('Expense not found');

      return;
    }

    const updatedExpense = await expensesService.update(expenseId, req.body);

    res.send(updatedExpense);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.send('There are some server error');
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
