'use strict';

const { expenseService } = require('../services/expenses.js');
const { usersService } = require('../services/users.js');

const expenseControllers = {
  getAll: async(req, res) => {
    const params = req.query;

    const expenses = await expenseService
      .getAll(params);

    res.send(expenses);
  },
  getOne: async(req, res) => {
    const id = Number(req.params.id);
    const expense = await expenseService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  },
  create: async(req, res) => {
    const params = req.body;

    const user = await usersService.findById(params.userId);

    const isCorrectParams = !(
      params.userId
      || params.userId
      || typeof params.userId !== 'number'
      || typeof params.title !== 'string'
      || typeof params.amount !== 'number'
      || typeof params.spentAt !== 'string'
    );

    if (!user || isCorrectParams) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await expenseService.create(params);

    res.statusCode = 201;
    res.send(newExpense);
  },
  remove: async(req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    try {
      expenseService.remove(id);

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(404);
    }
  },
  update: async(req, res) => {
    const id = Number(req.params.id);
    const params = req.body;

    try {
      await expenseService.update(id, params);

      res.send(await expenseService.getById(id));
    } catch (error) {
      res.sendStatus(404);
    }
  },
};

module.exports = {
  expenseControllers,
};
