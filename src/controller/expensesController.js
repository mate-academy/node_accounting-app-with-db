'use strict';

const {
  expensePostErrors, expensePatchErrors,
} = require('../errorsHandlers/expense');
const { error400, error404 } = require('../errorsHandlers/general');
const { expensesService } = require('../services/expenses');

class ExpensesController {
  async postExpense(req, res) {
    const error = await expensePostErrors(req.body);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    const expense = await expensesService.createExpense(req.body);

    res.statusCode = 201;
    res.json(expense);
  }

  async getExpenses(req, res) {
    const expenses = await expensesService.getAll(req.query);

    res.statusCode = 200;
    res.json(expenses);
  };

  async getExpense(req, res) {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.statusCode = 400;
      res.json({ error: error400 });

      return;
    }

    const expense = await expensesService.getOne(+expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.statusCode = 200;
    res.json(expense);
  };

  async removeExpense(req, res) {
    const { expenseId } = req.params;

    const isDeleted = await expensesService.removeOne(+expenseId);

    if (!isDeleted) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.sendStatus(204);
  };

  async patchExpense(req, res) {
    const { expenseId } = req.params;

    const error = await expensePatchErrors(req.body);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    await expensesService.modifyExpence(+expenseId, req.body);

    const expense = await expensesService.getOne(+expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.statusCode = 200;
    res.json(expense);
  };
}

const expensesController = new ExpensesController();

module.exports = {
  expensesController,
};
