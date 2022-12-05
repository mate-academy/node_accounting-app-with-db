"use strict";

const {
  getExpenseById,
  updateExpense,
  createExpense,
  getExpenseByTime,
  getExpenseByUser,
  getExpensesByCat,
  getAllExpenses,
  deleteOneExpense,
} = require("../services/expenses");

const { getById } = require("../services/users");

async function getExpensesForUser(req, res) {
  const { userId, category, from, to } = req.query;

  const id = +userId;

  const foundUser = await getById(users, id);

  if (!foundUser) {
    res.sendStatus(404)

    return;


    // if (category) {
    //   const expensesFilteredByCat = getExpensesByCat(
    //     expensesFilteredByUser, category
    //   );

    //   res.send(expensesFilteredByCat);

    //   return;
    // }
  }

  // if (from && to) {
  //   const expensesFilteredByDate = getExpenseByTime(expenses, from, to);

  //   res.send(expensesFilteredByDate);

  //   return;
  // }

  const expensesFilteredByUser = getExpenseByUser(id);

  res.send(expensesFilteredByUser);
}

async function getTotalExpenses(req, res) {
  const expenses = await getAllExpenses();

  res.send(expenses);

  res.statusCode = 200;
}

  async function postExpense(req, res) {
    const { user_id, name, amount, category, note } = await req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = await createExpense(
      +user_id,
      name,
      amount,
      category,
      note
    );

    res.send(newExpenses);
    res.statusCode = 201;
  }

function patchOneExpense(expenses) {
  async function patchExpense(req, res) {
    const { id } = req.params;

    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const body = req.body;

    updateExpense(expenses, +id, body);

    res.send(foundExpense);
    res.sendStatus(200);
  }

  return patchExpense;
}

  async function deleteExpense(req, res) {
    const { id } = req.params;
    const foundExpense = await getExpenseById(+id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const expenses = await deleteOneExpense(+id);
    res.sendStatus(204);
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
  getExpensesForUser,
  postExpense,
  patchOneExpense,
  deleteOneExpense,
  getOneExpense,
  getTotalExpenses,
  deleteExpense,
};
