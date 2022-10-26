'use strict';

const {
  getMany: getManyExpenses,
  getOne: getOneExpense,
  create: createExpense,
  remove: removeExpense,
  update: updateExpense,
} = require('../services/expenses');

const { getOne: getOneUser } = require('../services/users');

const getMany = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const dateIsInvalid
  = (userId && isNaN(+userId))
    || (from && isNaN(Date.parse(from)))
    || (to && isNaN(Date.parse(to)))
    || (category && typeof category !== 'string');

  if (dateIsInvalid) {
    res.sendStatus(400);

    return;
  }

  const filteredExpenses = getManyExpenses(userId, category, from, to);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = getOneExpense(expenseId);

  foundExpense ? res.send(foundExpense) : res.sendStatus(404);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const dateIsInvalid
    = isNaN(+userId)
      || !getOneUser(userId)
      || isNaN(+userId)
      || isNaN(Date.parse(spentAt))
      || typeof title !== 'string'
      || isNaN(+amount)
      || typeof category !== 'string'
      || typeof note !== 'string';

  if (dateIsInvalid) {
    res.sendStatus(400);

    return;
  };

  const newExpenses = createExpense(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(newExpenses);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const isExpenseFound = removeExpense(expenseId);

  res.sendStatus(isExpenseFound ? 204 : 404);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const dateIsInvalid
    = isNaN(+expenseId)
      || (spentAt && isNaN(Date.parse(spentAt)))
      || (title && typeof title !== 'string')
      || (amount && isNaN(+amount))
      || (category && typeof category !== 'string')
      || (note && typeof note !== 'string');

  if (dateIsInvalid) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = getOneExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  updateExpense(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getMany,
  getOne,
  create,
  remove,
  update,
};
