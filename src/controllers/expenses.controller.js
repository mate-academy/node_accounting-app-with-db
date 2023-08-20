import * as expensesService from '../services/expenses.service.js';
import * as usersService from '../services/users.service.js';
import pkg from 'http-errors';

const { NotFound } = pkg;

const getAllExpenses = async(req, res, next) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.send(expenses);
  } catch (err) {
    next(err);
  }
};

const getExpense = async(req, res, next) => {
  const { expensesId } = req.params;

  try {
    const expenses = await expensesService.getOne(expensesId);

    if (!expenses) {
      next(new NotFound('Expenses not found'));
    }

    res.send(expenses);
  } catch (err) {
    next(err);
  }
};

const createExpense = async(req, res, next) => {
  const { body } = req;

  try {
    const user = await usersService.getOne(body.userId);

    if (!user) {
      next(new NotFound('User not found'));
    }

    const newExpense = await expensesService.createOne(body);

    res.status(201).send(newExpense);
  } catch (error) {
    next(error);
  }
};

const updateExpense = async(req, res, next) => {
  const { expensesId } = req.params;
  const { body } = req;

  try {
    const expense = await expensesService.getOne(expensesId);

    if (!expense) {
      next(new NotFound('Expenses not found'));
    }

    const updatedExpense = await expensesService.updateOne(expensesId, body);

    res.send(updatedExpense);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async(req, res, next) => {
  const { expensesId } = req.params;

  try {
    const expense = await expensesService.getOne(expensesId);

    if (!expense) {
      next(new NotFound('Expenses not found'));
    }

    await expensesService.deleteOne(expensesId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
