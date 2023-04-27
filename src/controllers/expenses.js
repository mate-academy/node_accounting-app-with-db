'use strict';

const expenseServices = require('../services/expenses');
const userServices = require('../services/users');
const validateData = require('../utils/validateExpense');

const getAll = async(req, res) => {
  const expenses = await expenseServices.getAll();

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseServices.getOne(id);

  res.send(expense);
};

const add = async(req, res) => {
  const { userId } = req.body;

  const foundUser = await userServices.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const isDataValid = validateData(req.body);

  if (!isDataValid) {
    res.sendStatus(422);

    return;
  }

  const newExpense = await expenseServices.add(req.body);

  res.send(newExpense);
};

const update = async(req, res) => {
  const { id } = req.params;

  const foundExpense = await expenseServices.getOne(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseServices.update(id, req.body);

  const updatedExpense = await expenseServices.getOne(id);

  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  await expenseServices.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
