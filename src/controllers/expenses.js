'use strict';

const expensesServices = require('../services/expenses');

const getMany = async(req, res) => {
  const fieldsToSearch = req.body;

  const expenses = await expensesServices.getMany(fieldsToSearch);

  if (!expenses) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);

    return;
  }

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expensesId } = req.params;

  const expense = await expensesServices.getOne(expensesId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = async(req, res) => {
  const newExpenseBody = req.body;

  try {
    const newExpense = await expensesServices.create(newExpenseBody);

    res.statusCode = 201;
    res.send(newExpense);
  } catch (e) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  const { expensesId } = req.params;

  try {
    expensesServices.remove(expensesId);
  } catch (e) {
    res.sendStatus(404);

    return;
  }
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expensesId: id } = req.params;

  const fieldsForUpdate = req.body;

  try {
    const foundExpense = await expensesServices.update({
      id, fieldsForUpdate,
    });

    res.send(foundExpense);
  } catch (e) {
    res.sendStatus(404);
  }
};

module.exports = {
  getMany, getOne, add, remove, update,
};
