'use strict';

const { expenseService } = require('../services/expense.service.js');
const { userService } = require('../services/user.service.js');

const getAll = async(req, res) => {
  const params = req.query;
  const expenses = await expenseService.getAll(params);

  res.send(expenses.map(expenseService.normalizeExpense));
};

const getOne = async(req, res) => {
  const expenseId = Number(req.params.expenseId);
  const isExpenseValid = !isNaN(expenseId);

  if (!isExpenseValid) {
    res.sendStatus(400);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseService.normalizeExpense(foundExpense));
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = await userService.getById(userId);

  const isDataValid = userId
  && spentAt && title && amount && category && foundUser;

  if (!isDataValid) {
    res.sendStatus(400);

    return;
  }

  const isDataTypeValid = !(
    !typeof userId === 'number'
    || !typeof spentAt === 'string'
    || !typeof title === 'string'
    || !typeof amount === 'number'
    || !typeof category === 'string'
  );

  if (!isDataTypeValid) {
    res.sendStatus(422);

    return;
  }

  const options = req.body;
  const newExpense = await expenseService.create(options);

  res.statusCode = 201;
  res.send(expenseService.normalizeExpense(newExpense));
};

const remove = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  const isExpenseIdValid = !isNaN(expenseId);

  if (!isExpenseIdValid) {
    res.sendStatus(422);

    return;
  }

  const expenseToRemove = await expenseService.getById(expenseId);

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  await expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  const isExpenseIdValid = !isNaN(expenseId);

  if (!isExpenseIdValid) {
    res.sendStatus(422);

    return;
  }

  const expenseToUpdate = await expenseService.getById(expenseId);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const options = req.body;

  if (!options) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = await expenseService.update(
    expenseId,
    options
  );

  res.send(expenseService.normalizeExpense(updatedExpense));
};

module.exports = {
  expenseController: {
    getAll,
    getOne,
    create,
    remove,
    update,
  },
};
