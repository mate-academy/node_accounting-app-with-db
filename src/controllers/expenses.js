'use strict';

const { service: expenseService } = require('../services/expenses');
const { service: userService } = require('../services/users');

const getAll = async(req, res) => {
  const urlSplit = req.url.split('?');
  const queryString = urlSplit[1] || '';
  const searchParams = new URLSearchParams(queryString);

  const userId = searchParams.get('userId');
  const categories = searchParams.getAll('categories');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const filterOptions = {
    userId,
    categories,
    from,
    to,
  };

  const foundExpenses = await expenseService.getAll(filterOptions);

  res.statusCode = 200;
  res.send(foundExpenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const add = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create({
    userId,
    spentAt,
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

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.removeById(expenseId);

  res.sendStatus(204);
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

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update(expenseId, {
    spentAt: spentAt || foundExpense.spentAt,
    title: title || foundExpense.title,
    amount: amount || foundExpense.amount,
    category: category || foundExpense.category,
    note: note || foundExpense.note,
  });

  const updatedExpense = await expenseService.getById(expenseId);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const controller = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports.controller = controller;
