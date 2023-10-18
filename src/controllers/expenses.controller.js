'use strict';

const service = require('../services/expenses.services');
const { getById: getUserById } = require('../services/users.services');

const getAllExpenses = async(req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const conditions = {};

  if (userId) {
    conditions.userId = userId;
  }

  if (categories) {
    conditions.category = categories;
  }

  let expenses = await service.getAll(
    conditions,
  );

  if (from) {
    expenses = expenses.filter(expense => {
      return new Date(expense.spentAt).valueOf() >= new Date(from).valueOf();
    });
  }

  if (to) {
    expenses = expenses.filter(expense => {
      return new Date(expense.spentAt).valueOf() <= new Date(to).valueOf();
    });
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getExpense = async(req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const searcedExpense = await service.getById(id);

  if (!searcedExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(searcedExpense);
};

const post = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!getUserById(+userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  service.add(newExpense);
  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const id = +req.params.id;
  const expenseToRemove = service.getById(id);

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  service.remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = +req.params.id;
  const body = req.body;

  if (!id || !body) {
    res.sendStatus(400);

    return;
  }

  if (!service.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = service.update(id, body);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  post,
  removeExpense,
  updateExpense,
};
