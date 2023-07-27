'use strict';

const { ApiError } = require('../errorHandler/errorHandler');
const { ExpensesService } = require('../services/expenses.service');

const getAllExpensesController = async(req, res, next) => {
  const expensesService = new ExpensesService();
  const searchQuery = req.query;
  const expenses = await expensesService.getAll(searchQuery);

  res.status(200).send(expenses);
};

const createExpenseController = async(req, res, next) => {
  const expensesService = new ExpensesService();
  const { title, amount, spentAt, category } = req.body;

  if (!title || !amount || !spentAt || !category) {
    return next(ApiError.badRequest(
      'title or amount or spentAt or category can not be empty'
    ));
  }

  const createdExpense = await expensesService.create({
    title,
    amount,
    spentAt,
    category,
  });

  res.status(201).send(createdExpense);
};

const getOneExpenseController = async(req, res, next) => {
  const expensesService = new ExpensesService();
  const { expenseId } = req.params;

  const expense = await expensesService.getOne(expenseId);

  if (!expense) {
    return next(ApiError.notFound('expense not found'));
  }

  res.status(200).send(expense);
};

const removeExpenseController = async(req, res, next) => {
  const expensesService = new ExpensesService();
  const { expenseId } = req.params;

  const isRemoved = await expensesService.remove(expenseId);

  if (!isRemoved) {
    return next(ApiError.notFound('expense not found'));
  }

  res.sendStatus(204);
};

const updateExpenseController = async(req, res, next) => {
  const expensesService = new ExpensesService();
  const { expenseId } = req.params;
  const newExpense = req.body;

  const results = await expensesService.update(expenseId, newExpense);

  if (results.some(success => !success)) {
    return next(ApiError.notFound('expense not found'));
  }

  res.sendStatus(200);
};

module.exports = {
  getAllExpensesController,
  createExpenseController,
  getOneExpenseController,
  removeExpenseController,
  updateExpenseController,
};
