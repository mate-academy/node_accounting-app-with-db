'use strict';

const expenseService = require('../services/expense');
const { createErrorStatus } = require('../entity/createErrorStatus');
const { getById: getUserById } = require('../services/user');

async function getAll(req, res) {
  const expenses = await expenseService.getAll(req.query);

  res.status(200).send(expenses);
};

async function getOne(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    createErrorStatus(res, 400, 'expenseId');

    return;
  }

  const expenses = await expenseService.getById(expenseId);

  if (!expenses) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  res.status(200).send(expenses);
};

async function add(req, res) {
  const hasRequireParams = expenseService.checkParams(req.body);

  if (hasRequireParams.length) {
    createErrorStatus(res, 400, hasRequireParams);
  }

  const user = await getUserById(req.body.userId);

  if (!user) {
    res.status(400).send('User not found');
  }

  const newExpense = await expenseService.create(req.body);

  res.status(201).send(newExpense);
}

async function remove(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    createErrorStatus(res, 400, 'expenseId');

    return;
  }

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  await expenseService.remove(expenseId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  const foundExpense = await expenseService.getById(+expenseId);

  if (!foundExpense) {
    createErrorStatus(res, 404, 'expenseId');

    return;
  }

  const reqParams = req.body;

  if (!Object.keys(reqParams).length) {
    res.status(400).send('No params');
  }

  const updatedExpense = await expenseService.update({
    id: +expenseId,
    ...reqParams,
  });

  res.status(200).send(updatedExpense);
}

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
