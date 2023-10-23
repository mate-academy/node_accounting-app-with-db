'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController.js');
const userServices = require('../services/userServices.js');
const expensesServices = require('../services/expensesServices.js');

const isValidQueryGetAll = async(req, res, next) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  if (!userId
    || !category
    || !from
    || !to) {
    res.sendStatus(400);
  }

  next();
};

const isValidAdd = async(req, res, next) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
    || !userServices.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  next();
};

const isValidId = async(req, res, next) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  next();
};

const isValidTarget = async(req, res, next) => {
  const { expenseId } = req.params;
  const currentExpense = await expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  next();
};

router.get(
  '/',
  express.json(),
  isValidQueryGetAll,
  expensesController.getAll
);

router.post(
  '/',
  express.json(),
  isValidAdd,
  expensesController.add
);

router.get(
  '/:expenseId',
  express.json(),
  isValidId,
  expensesController.getCurrentExpense
);

router.delete(
  '/:expenseId',
  isValidId,
  isValidTarget,
  expensesController.remove
);

router.patch(
  '/:expenseId',
  express.json(),
  isValidId,
  isValidTarget,
  expensesController.update
);

module.exports = {
  router,
};
