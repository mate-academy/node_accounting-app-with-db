'use strict';

const expensesServices = require('../services/expenses.service.js');
const { checkType } = require('../functions/checkType.js');

const User = require('../models/User.model.js');

const getAll = async (req, res) => {
  const params = {
    userId: +req.query.userId ? +req.query.userId : null,
    categories: req.query.categories ? [req.query.categories].flat() : null,
    from: req.query.from ? req.query.from : null,
    to: req.query.to ? req.query.to : null,
  };

  const result = await expensesServices.getAll(params);

  res.json(result).end();
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400).end();

    return;
  }

  const exp = await expensesServices.getOne(id);

  if (!exp) {
    res.sendStatus(404);

    return;
  }

  res.send(exp).status(200).end();
};

const addExpense = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (
    ['userId', 'spentAt', 'title', 'amount', 'category'].every((key) =>
      Object.keys(req.body).includes(key),
    )
    && Object.entries(req.body).every((entry) => checkType(entry[0], entry[1]))
    && user

  ) {
    const newExpense = await expensesServices.addExpense(req.body);

    res.status(201).send(newExpense).end();

    return;
  }

  res.sendStatus(400);
};

const delExpense = async (req, res) => {
  const { id } = req.params;

  const deleted = await expensesServices.delExpense(id);

  if (deleted) {
    res.sendStatus(404).end();

    return;
  }

  res.sendStatus(204).end();
};

const editExpense = async (req, res) => {
  const id = +req.params.id;
  const expense = req.body;

  const editedExpense = await expensesServices.editExpense(expense, id);

  if (!editedExpense) {
    res.sendStatus(404);
  }

  res.send(editedExpense).end();
};

module.exports = {
  getAll,
  addExpense,
  getOne,
  delExpense,
  editExpense,
};
