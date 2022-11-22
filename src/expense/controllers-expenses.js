'use strict';

import * as expensesService from './services-expenses.js';

export const getAll = async (_, res) => {
  res.send(await expensesService.getAll());
};

export const getExpense = async (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const findedExpense = await expensesService.getById(expenseId);

  if (!findedExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(findedExpense);
};

export const createExpense = async(req, res) => {
  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await expensesService.create(req.body);

    res.statusCode = 201;

    res.send(newExpense);
  }
   catch {
    res.sendStatus(422);
   }


};

export const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expensesService.remove(expenseId)) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

export const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const body = req.body;

  if (!expenseId) {
    res.sendStatus(404);

    return;
  }

  const data = Object.assign({ expenseId }, body);

  try {
    await expensesService.update(data)
  } catch (err){
    console.log(err);
    res.sendStatus(422);

    return;
  }

  res.sendStatus(202);
};
