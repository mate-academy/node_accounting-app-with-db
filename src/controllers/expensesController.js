'use strict';

const expensesServices = require('../services/expensesServices.js');

const getAll = async(req, res) => {
  try {
    const expenses = await expensesServices.getAll(req.query);

    res.status(200).send(expensesServices.normalize(expenses));
  } catch (error) {
    res.sendStatus(500);
  }
};

const add = async(req, res) => {
  try {
    const newExpense = await expensesServices.createExpense(req.body);

    res.status(201).send(expensesServices.normalize(newExpense));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getCurrentExpense = async(req, res) => {
  const { expenseId } = req.params;

  try {
    const currentExpense = await expensesServices.getExpenseById(expenseId);

    if (!currentExpense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expensesServices.normalize(currentExpense));
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  try {
    await expensesServices.removeExpense(expenseId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async(req, res) => {
  const { expenseId } = req.params;

  try {
    await expensesServices.updateExpense(expenseId, req.body);

    const updatedExpense = await expensesServices.getExpenseById(expenseId);

    res.status(200).send(expensesServices.normalize(updatedExpense));
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  add,
  getCurrentExpense,
  remove,
  update,
};
