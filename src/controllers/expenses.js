'use strict';

const expencesServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.send(expencesServices.getAll());

    return;
  }

  res.send(expencesServices.getFiltered(searchParams));
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expencesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = userServices.getById(userId);

  const isCorrect = user && spentAt && title && amount && category;

  if (!isCorrect) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expencesServices.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expencesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expencesServices.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const expenseBody = req.body;

  const foundExpense = expencesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!expenseBody) {
    res.sendStatus(400);

    return;
  }

  expencesServices.update(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
