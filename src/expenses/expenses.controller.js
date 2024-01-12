'use strict';

const expenseController = require('./expenses.services');
const userController = require('../users/users.services');

const expenseKeys = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
];

const checkProps = (expense) => expenseKeys
  .every(prop => expense.hasOwnProperty(prop));

const getAll = async(req, res) => {
  res.status(200).send(await expenseController.getAll(req.query));
};

const getById = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseController.getByID(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = async(req, res) => {
  const expense = req.body;

  if (!checkProps(expense)) {
    res.sendStatus(400);

    return;
  }

  if (!(await userController.getByID(expense.userId))) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseController.create(expense);

  res.status(201).send(newExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await expenseController.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  await expenseController.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!(await expenseController.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  const expense = await expenseController.update(id, newExpense);

  res.status(204).send(expense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
