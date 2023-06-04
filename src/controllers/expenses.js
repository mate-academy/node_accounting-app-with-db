'use strict';

const { expenseService } = require('../services/expenses');

const getAll = async(req, res) => {
  const expenses = await expenseService.getAllExpenses(req.query);

  res.send(expenses);
};
const getOne = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getOneExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

module.exports = {
  getOne,
  getAll,
};
