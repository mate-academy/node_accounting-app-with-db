'use strict';

const expensesService = require('../services/expenses.service');
const { userService } = require('../services/user.service');

const expensesController = {
  get: async(req, res) => {
    const { userId, categories, from, to } = req.query;

    res.send(await expensesService.get(userId, categories, from, to));
  },
  getById: async(req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);
    }

    const expense = await expensesService.getById(id);

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  },
  addExpense: async(req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = await userService.getById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const buff = {
      userId, spentAt, title, amount, category, note,
    };

    const newExpense = {};

    for (const key in buff) {
      if (!req.body[key]) {
        res.sendStatus(400);

        return;
      } else {
        newExpense[key] = buff[key];
      }
    }

    const expenseWithId = await expensesService.createExpense(newExpense);

    res.statusCode = 201;
    res.send(expenseWithId);
  },
  remove: async(req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(204);

      return;
    }

    if (!await expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    await expensesService.remove(id);
    res.sendStatus(204);
  },
  update: async(req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!await expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    const updatedExpenses = await expensesService.update(body, id);

    res.send(updatedExpenses);
  },
};

module.exports = expensesController;
