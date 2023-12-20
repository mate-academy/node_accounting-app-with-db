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
  res.send(expenses);
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
    console.log('Expense was deleted successfully');
  })
    .catch((error) => {
      console.error('Error occurred:', error);
    });

  res.sendStatus(204);
};

const create = (req, res) => {
  if (!req.body) {
    res.sendStatus(422);

    return;
  }

  const createdExpense = expensesService.addExpense(req.body).then(() => {
    console.log('Expense was added successfully');
  })
    .catch((error) => {
      console.error('Error occurred:', error);
    });

  res.statusCode = 201;
  res.send(createdExpense);
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
