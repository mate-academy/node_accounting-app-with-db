'use strict';

const expensesService = require('../services/expenses');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll();

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  res.send(foundExpense);
};

const create = async(req, res) => {
  const newExpense = req.body;
  const { title, userId } = newExpense;

  if (!title || !userId) {
    res.sendStatus(400);

    return;
  };

  await expensesService.addOne(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  expensesService.deleteOne(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const newData = req.body;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  };

  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  const updatedExpense = await expensesService.updateOne(expenseId, newData);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
