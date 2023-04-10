'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = async(_req, res) => {
  const expenses = await expenseService.getAll();

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  } else {
    res.send(foundExpense);
  }
};

const getByParameters = async(req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  if (userId && !categories && !from && !to) {
    const foundUser = await userService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
  }

  let categoriesArray = categories;

  if (categoriesArray) {
    categoriesArray = Array.isArray(categories)
      ? categories
      : [ categories ];
  }

  const foundExpenses = await expenseService
    .getByParameters(userId, categoriesArray, from, to);

  res.send(foundExpenses);
};

const add = async(req, res) => {
  const {
    userId,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  };

  if (
    typeof userId !== 'number'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.send(foundExpense);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const { amount } = req.body;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  let isValid = true;

  for (const key in req.body) {
    switch (key) {
      case 'amount':
        isValid = typeof amount === 'number';
        break;
      case 'title':
      case 'category':
      case 'note':
        isValid = typeof req.body[key] === 'string';
        break;
      default:
        res.sendStatus(422);

        return;
    }
  }

  if (!isValid) {
    res.sendStatus(400);

    return;
  }

  await expenseService.update(expenseId, { ...req.body });

  const updatedExpense = await expenseService.getById(expenseId);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  getByParameters,
  add,
  remove,
  update,
};
