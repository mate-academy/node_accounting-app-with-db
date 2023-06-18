'use strict';

const expenseServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = async(req, res) => {
  const body = req.query;
  const expenses = await expenseServices.getAll(body);

  res.send(
    expenses.map(expenseServices.normalize)
  );
};

const getOne = async(req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseServices.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expenseServices.normalize(foundExpense),
  );
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

  const foundUser = await userServices.getById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!Number.isInteger(userId) || !spentAt || !title
    || !Number.isInteger(amount) || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseServices.create(req.body);

  res.status(201);

  res.send(
    expenseServices.normalize(newExpense),
  );
};

const remove = async(req, res) => {
  const { expensesId } = req.params;

  if (!expensesId) {
    res.sendStatus(400);

    return;
  }

  const foundExpenses = await expenseServices.getById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  await expenseServices.remove(expensesId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expensesId } = req.params;
  const body = req.body;

  if (!expensesId || !body) {
    res.sendStatus(400);

    return;
  }

  await expenseServices.update({
    id: +expensesId,
    ...body,
  });

  const foundExpense = await expenseServices.getById(Number(expensesId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expenseServices.normalize(foundExpense),
  );
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
