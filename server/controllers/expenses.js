'use strict';

const {
  getExpenseById,
  updateExpense,
  createExpense,
  getExpenseByTime,
  getExpenseByUser,
  getExpensesByCat,
} = require('../services/expenses');

const { getById } = require('../services/users');

function getAllExpenses(expenses, users) {
  function getExpenses(req, res) {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = +userId;

    const foundUser = getById(users, id);

    if (foundUser) {
      const expensesFilteredByUser = getExpenseByUser(expenses, id);

      if (category) {
        const expensesFilteredByCat = getExpensesByCat(
          expensesFilteredByUser, category
        );

        res.send(expensesFilteredByCat);

        return;
      }

      res.send(expensesFilteredByUser);

      return;
    }

    if (from && to) {
      const expensesFilteredByDate = getExpenseByTime(expenses, from, to);

      res.send(expensesFilteredByDate);

      return;
    }

    res.send(expenses);
  }

  return getExpenses;
}

function postOneExpense(expenses, users) {
  function postExpense(req, res) {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = getById(users, userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    };

    const newExpenses = createExpense(expenses, userId,
      spentAt, title, amount, category, note);

    res.statusCode = 201;
    res.send(newExpenses);
  }

  return postExpense;
}

function patchOneExpense(expenses) {
  async function patchExpense(req, res) {
    const { id } = req.params;

    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    const body = req.body;

    updateExpense(expenses, +id,
      body);

    res.send(foundExpense);
    res.sendStatus(200);
  }

  return patchExpense;
}

function deleteOneExpense(expenses) {
  function deleteExpense(req, res) {
    const { id } = req.params;
    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(expenses.indexOf(foundExpense), 1);
    res.sendStatus(204);
  }

  return deleteExpense;
}

function getOneExpense(expenses) {
  function getExpense(req, res) {
    const { id } = req.params;
    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  }

  return getExpense;
}

module.exports = {
  getAllExpenses,
  postOneExpense,
  patchOneExpense,
  deleteOneExpense,
  getOneExpense,
};
