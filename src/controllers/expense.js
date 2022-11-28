'use strict';

const expensesService = require('../data-services/expense.js');
const userService = require('../data-services/user');

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

async function getAll(req, res) {
  const searchParams = req.query;

  if (!searchParams) {
    res.send(await expensesService.getAll());

    return;
  }

  const { userId, category, from, to } = searchParams;
  const filterParams = {};

  if (userId) {
    if (isNaN(parseInt(userId))) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.getOne(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    filterParams.userId = userId;
  }

  if (category) {
    filterParams.category = category;
  }

  if (from && to) {
    const valid = from.match(datePattern) && to.match(datePattern);

    if (!valid) {
      res.sendStatus(400);

      return;
    }

    filterParams.from = from + ' 00:00:00.000 +00:00';
    filterParams.to = to + ' 23:59:59.000 +00:00';
  }

  res.send(await expensesService.getFiltered(filterParams));
}

async function getOne(req, res) {
  const { expenseId } = req.params;

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getOne(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

async function create(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note = null,
  } = req.body;

  let user;

  if (userId && !isNaN(parseInt(userId))) {
    user = await userService.getOne(userId);
  }

  const allCorrect = user && title && category
    && !isNaN(parseInt(amount))
    && spentAt.match(datePattern);

  if (!allCorrect) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  ));
}

async function remove(req, res) {
  const { expenseId } = req.params;

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getOne(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteOne(expenseId);
  res.sendStatus(204);
}

async function modify(req, res) {
  const { expenseId } = req.params;
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.getOne(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const expenseBody = {};

  if (userId && !isNaN(parseInt(userId))) {
    const user = await userService.getOne(userId);

    if (user) {
      expenseBody.userId = userId;
    } else {
      res.sendStatus(400);

      return;
    }
  } else if (userId && isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  if (spentAt && spentAt.match(datePattern)) {
    expenseBody.spentAt = spentAt;
  } else if (spentAt && !spentAt.match(datePattern)) {
    res.sendStatus(400);

    return;
  }

  if (title) {
    expenseBody.title = title;
  }

  if (amount && !isNaN(parseInt(amount))) {
    expenseBody.amount = amount;
  } else if (amount && isNaN(parseInt(amount))) {
    res.sendStatus(400);

    return;
  }

  if (category) {
    expenseBody.category = category;
  }

  if (note) {
    expenseBody.note = note;
  }

  if (!Object.keys(expenseBody).length) {
    res.sendStatus(400);

    return;
  }

  await expensesService.modifyOne(expenseId, expenseBody);

  res.statusCode = 200;
  res.send(await expensesService.getOne(expenseId));
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  modify,
};
