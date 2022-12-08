"use strict";

const {
  getExpenseById,
  updateExpense,
  createExpense,
  getAllExpenses,
  deleteOneExpense,
} = require("../services/expenses");

const { getById } = require("../services/users");

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

async function patchExpense(req, res) {
  const { id } = await req.params;

  const foundExpense = await getExpenseById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { name, amount, category, note } = req.body;

  updateExpense(name, amount, category, note, +id);

  res.send(200);
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

module.exports = {
  postExpense,
  patchExpense,
  getTotalExpenses,
  deleteExpense,
};
