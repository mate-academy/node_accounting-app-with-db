'use strict';

const {
  checkPostData, checkPatchData, checkExpenseId,
} = require('../utility/dataCheck/expense');
const {
  entityNotExist, userNotExist,
} = require('../utility/dataCheck/errorMessages');
const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');
const { checkUserId } = require('../utility/dataCheck/user');

class ExpensesController {
  async postExpense(req, res) {
    const { userId } = req.body;

    const userErrors = checkUserId(userId);

    if (userErrors.errors.length !== 0) {
      res.status(400);
      res.json(userErrors);

      return;
    }

    const hasUser = await usersService.getOne(+userId);

    if (hasUser) {
      res.statusCode = 400;
      res.json({ error: userNotExist });

      return;
    }

    const error = await checkPostData(req.body);

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

    const error = checkExpenseId(expenseId);

    if (isNaN(+expenseId)) {
      res.statusCode = 400;
      res.json(error);

      return;
    }

    const expense = await expensesService.getOne(+expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.json({ error: entityNotExist });

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
      res.json({ error: entityNotExist });

      return;
    }

    res.sendStatus(204);
  };

  async patchExpense(req, res) {
    const { expenseId } = req.params;

    const error = await checkPatchData(req.body);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    await expensesService.modifyExpence(+expenseId, req.body);

    const expense = await expensesService.getOne(+expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.json({ error: entityNotExist });

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
