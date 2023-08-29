'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/expensesServices.js');

const getExpenses = (req, res) => {
  const body = req.body;
  const users = getAll();

  res.sendStatus(200);

  switch (Object.keys(body)) {
    case 'userId':
      res.end(users.filter(user => user.id === body.userId));
      break;
    case 'categories':
      res.end(users.filter(user => user.categories === body.categories));
      break;
    case 'from':
      res.end(users
        .filter(user => new Date(user.spentAt) >= new Date(body.from)));
      break;
    case 'to':
      res.end(users
        .filter(user => new Date(user.spentAt) <= new Date(body.to)));
      break;
    default:
      res.end(users);
  }
};

const createExpense = (req, res) => {
  const { userId, amount, category, note } = req.body;

  if (!userId || !amount || !category || !note) {
    res.sendStatus(400);
  }

  const newExpences = create({
    userId, amount, category, note,
  });

  res.sendStatus(201);
  res.end(newExpences);
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);
  }

  res.sendStatus(200);
  res.end(foundExpenses);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);
  }

  remove(id);
  res.sendStatus(204);
  res.end();
};

const updateExpense = (res, req) => {
  const { id } = req.params;
  const reqBody = req.body;
  const foundExpenses = getById(id);

  if (!foundExpenses) {
    res.sendStatus(404);
  }

  if (Object.keys(reqBody).length === 0) {
    res.sendStatus(400);
  }

  res.sendStatus(200);
  res.end(update(reqBody, id));
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
