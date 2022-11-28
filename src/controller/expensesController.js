'use strict';

const {
  expensePostErrors, expensePatchErrors,
} = require('../errorsHandlers/expense');
const { error400, error404 } = require('../errorsHandlers/general');
const { ExpensesService } = require('../services/expenses');

class ExpensesController extends ExpensesService {
  async postExpense(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const error = await expensePostErrors({
      userId, spentAt, title, amount, category, note,
    });

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    const expense = await super.createExpense({
      userId, spentAt, title, amount, category, note,
    });

    res.statusCode = 201;
    res.json(expense);
  }

  async getExpenses(req, res) {
    const { userId, category, to, from } = req.query;

    const expenses = await super.getAll({
      userId, category, to, from,
    });

    res.statusCode = 200;
    res.json(expenses);
  };

  async getExpense(req, res) {
    const { expenseId } = req.params;

    if (isNaN(expenseId)) {
      res.statusCode = 400;
      res.json({ error: error400 });

      return;
    }

    const expenseData = await super.getOne(expenseId);

    if (!expenseData) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.statusCode = 200;
    res.json(expenseData);
  };

  async removeExpense(req, res) {
    const { expenseId } = req.params;

    const isDeleted = await super.removeOne(expenseId);

    if (!isDeleted) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.sendStatus(204);
  };

  async patchExpense(req, res) {
    const { expenseId } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const error = await expensePatchErrors({
      spentAt, title, amount, category, note,
    });

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    await super.modifyExpence(expenseId, req.body);

    const expense = await super.getOne(expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.statusCode = 200;
    res.json(expense);
  };
}

const expensesController = new ExpensesController([]);

module.exports = {
  expensesController,
};
