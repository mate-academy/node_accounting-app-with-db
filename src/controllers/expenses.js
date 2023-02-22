'use strict';

const expanseServise = require('../services/expenses');
const userServise = require('../services/users');

const add = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = await userServise.getById(userId);

  const isValidData
    = foundUser
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string'
    && typeof note === 'string';

  if (!isValidData) {
    res.sendStatus(400);

    return;
  }

  const expanseData = req.body;

  const newExpanse = await expanseServise.create(expanseData);

  res.statusCode = 201;

  res.send(
    expanseServise.normalize(newExpanse),
  );
};

const getAll = async(req, res) => {
  const queryParams = req.query;

  const expenses = await expanseServise.getAll(queryParams);

  res.send(
    expenses.map(expanseServise.normalize)
  );
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expanseServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(
    expanseServise.normalize(foundExpense),
  );
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expanseServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const receivedData = req.body;

  await expanseServise.update(expenseId, receivedData);

  const updatedExpanse = await expanseServise.getById(expenseId);

  res.send(expanseServise.normalize(updatedExpanse));
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expanseServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expanseServise.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
