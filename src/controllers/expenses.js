'use strict';

const {
  getMany: getManyExpenses,
  getOne: getOneExpense,
  create: createExpense,
  remove: removeExpense,
  update: updateExpense,
  normalize,
} = require('../services/expenses');

const { getOne: getOneUser } = require('../services/users');

const getMany = async(req, res) => {
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

  const filteredExpenses = await getManyExpenses(userId, category, from, to);

  res.send(filteredExpenses.map(normalize));
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await getOneExpense(expenseId);

  foundExpense ? res.send(normalize(foundExpense)) : res.sendStatus(404);
};

const create = async(req, res) => {
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

  const newExpenses = await createExpense(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(normalize(newExpenses));
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const isExpenseFound = await removeExpense(expenseId);

  res.sendStatus(isExpenseFound ? 204 : 404);
};

const update = async(req, res) => {
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

  const foundExpense = await getOneExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await updateExpense(expenseId, req.body);

  res.send(normalize(updatedExpense));
};

module.exports = {
  getMany,
  getOne,
  create,
  remove,
  update,
};
