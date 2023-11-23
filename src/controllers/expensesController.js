'use strict';

const { validate } = require('uuid');
const expensesService = require('./../services/expensesService');
const usersService = require('./../services/usersService');

const get = async(req, res) => {
  let expenses;

  if (req.query.from && req.query.to) {
    if (!(Date.parse(req.query.from) > 0)
      || !(Date.parse(req.query.to) > 0)
      || Object.keys(req.query).length > 2) {
      res.sendStatus(400);
    }

    try {
      expenses = await expensesService
        .getByDate(req.query.from, req.query.to);

      res.send(expenses);
    } catch (error) {
      res.sendStatus(500);
    }

    return;
  }

  if (req.query.userId && req.query.categories) {
    if (!validate(req.query.userId) || Object.keys(req.query).length > 2) {
      res.sendStatus(400);
    }

    try {
      expenses = await expensesService
        .getByCategory(req.query.userId, req.query.categories);

      res.send(expenses);
    } catch (error) {
      res.sendStatus(500);
    }

    return;
  }

  if (req.query.userId) {
    if (!validate(req.query.userId) || Object.keys(req.query).length > 1) {
      res.sendStatus(404);
    }

    try {
      expenses = await expensesService.getByUserId(req.query.userId);

      res.send(expenses);
    } catch (error) {
      res.sendStatus(500);
    }

    return;
  }

  if (!Object.keys(req.query).length) {
    try {
      expenses = await expensesService.getAll();

      res.send(expenses);
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
};

const create = async(req, res) => {
  const expense = req.body;

  if (!validate(expense.userId)
    || !(await usersService.getById(expense.userId))
    || !expense.spentAt
    || !expense.title
    || !expense.category
    || !Number.isFinite(expense.amount)
    || !(Date.parse(expense.spentAt) > 0)
  ) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await expensesService.create(expense);

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!validate(id)) {
    res.sendStatus(400);

    return;
  }

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!validate(id)) {
    res.sendStatus(400);

    return;
  }

  try {
    if (!(await expensesService.getById(id))) {
      res.sendStatus(404);

      return;
    }

    await expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!validate(id)
    || !newExpense.spentAt
    || !newExpense.title
    || !newExpense.category
    || !Number.isFinite(newExpense.amount)
    || !(Date.parse(newExpense.spentAt) > 0)
  ) {
    res.sendStatus(400);

    return;
  }

  try {
    if (!(await expensesService.getById(id))) {
      res.sendStatus(404);

      return;
    }

    await expensesService.update(id, newExpense);

    const expense = await expensesService.getById(id);

    res.send(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
