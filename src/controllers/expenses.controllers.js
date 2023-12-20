'use strict';

const expensesService = require('../services/expenses.service');

const get = async(req, res) => {
  const { userId, categories, from, to } = req.body;

  const expenses = expensesService.getExpenses({
    userId, categories, from, to,
  });

  if (!expenses) {
    res.sendStatus(404);

    return;
  }
  res.send((await expenses).map(expense => expensesService.normalize(expense)));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expensesService.normalize(expense));
};

const remove = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expense).then(() => {
    // eslint-disable-next-line no-console
    console.log('Expense was deleted successfully');
  })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error occurred:', error);
    });

  res.sendStatus(204);
};

const create = (req, res) => {
  if (!req.body) {
    res.sendStatus(422);

    return;
  }

  expensesService.addExpense(req.body).then(() => {
    // eslint-disable-next-line no-console
    console.log('Expense was added successfully');
  })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error occurred:', error);
    });

  res.statusCode = 201;
  res.send(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, amount, category, note } = req.body;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = expensesService.updateExpense(
    {
      id, title, amount, category, note,
    }
  );

  res.statusCode = 201;
  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
