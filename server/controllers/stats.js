'use strict';

const expensesModel = require('../models/expenses');

const getStats = (req, res) => {
  const {
    from = null,
    to = null,
    user = null,
    category = [],
  } = req.query;

  const statsResult = {};

  let filteredExpenses = expensesModel.getAll();

  if (user) {
    statsResult.user = user;

    filteredExpenses = filteredExpenses
      .filter(expense => expense.user === user);
  }

  if (category.length) {
    statsResult.categories = category;

    filteredExpenses = filteredExpenses
      .filter(expense => category.includes(expense.category));
  }

  if (from || to) {
    const fromDate = from && new Date(from);
    const toDate = to && new Date(to);

    let fromTime = 0;

    if (fromDate && fromDate.toString() !== 'Invalid Date') {
      fromTime = fromDate.getTime();
      statsResult.from = fromDate.toString();
    }

    let toTime = Infinity;

    if (toDate && toDate.toString() !== 'Invalid Date') {
      toTime = toDate.getTime();
      statsResult.to = toDate.toString();
    }

    if (fromTime > toTime) {
      res.statusCode = 400;
      res.end();

      return;
    }

    filteredExpenses = filteredExpenses
      .filter(expense => expense.date >= fromTime && expense.date <= toTime);
  }

  statsResult.totalEntries = filteredExpenses.length;

  statsResult.totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + +expense.amount, 0,
  );

  statsResult.expenses = filteredExpenses;

  res.send(statsResult);
};

module.exports = { getStats };
