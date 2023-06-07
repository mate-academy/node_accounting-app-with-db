'use strict';

const expensesService = require('../serviсes/expenses');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll();

  res.send(expenses);
};

const create = async(req, res) => {
  const expenseData = req.body;

  const newExpense = await expensesService.add(expenseData);

  if (!newExpense) {
    res.sendStatus(400);
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const isExpense = await expensesService.getById(expenseId);

  if (!isExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const dataToChange = req.body;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const result = await expensesService.update(expenseId, dataToChange);

  if (result) {
    res.statusCode = 200;
    res.send(result);
  } else {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
