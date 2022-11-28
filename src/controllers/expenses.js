'use strict';

const expencesServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = async(req, res) => {
  const searchParams = req.query;

  if (!searchParams) {
    res.send(await expencesServices.getAll());

    return;
  }

  res.send(await expencesServices.getFiltered(searchParams));
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expencesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

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

  const user = await userServices.getById(userId);

  const isCorrect = user && spentAt && title && amount && category;

  if (!isCorrect) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expencesServices.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expencesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expencesServices.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const expenseBody = req.body;

  const foundExpense = await expencesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!expenseBody) {
    res.sendStatus(400);

    return;
  }

  await expencesServices.update(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
