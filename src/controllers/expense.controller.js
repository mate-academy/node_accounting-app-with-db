'use strict';

// const getFilteredExpenses = require('./../helpers/getFilteredExpenses');
const expenseService = require('./../services/expense.service');
const userService = require('../services/user.service');
const prepareQuery = require('../helpers/prepareQuery');

const expenseController = {
  // get: (req, res) => {
  //   res.send(getFilteredExpenses(req.query, expenseService.getAll()));
  // },

  get: async(req, res) => {
    const query = prepareQuery(req.query);
    const expenses = await expenseService.getAll(query);

    res.send(expenses.map((expense) => expenseService.normalize(expense)));
  },

  getOne: async(req, res) => {
    const { id } = req.params;

    const expense = await expenseService.getById(+id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expenseService.normalize(expense));
  },

  post: async(req, res) => {
    const { userId, title, amount, category } = req.body;

    if (!title
      || !amount
      || !category
      || !(await userService.getById(userId))
    ) {
      res.sendStatus(400);

      return;
    }

    const expense = await expenseService.create(req.body);

    res.statusCode = 201;
    res.send(expenseService.normalize(expense));
  },

  patch: async(req, res) => {
    const { id } = req.params;

    const expense = await expenseService.update(+id, req.body);

    if (!expense[1]) {
      res.sendStatus(404);

      return;
    }

    res.send(expenseService.normalize(expense));
  },

  delete: async(req, res) => {
    const { id } = req.params;
    const expense = await expenseService.getById(+id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.delete(+id);
    res.send(expenseService.normalize(expense));
  },
};

module.exports = expenseController;
