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
    try {
      const {
        userId,
        title,
        amount,
        spentAt,
      } = req.body;

      const user = await usersService.findById(userId);

      const isCorrectParams = !(
        userId
        || title
        || typeof userId !== 'number'
        || typeof title !== 'string'
        || typeof amount !== 'number'
        || typeof spentAt !== 'string'
      );

      if (!user || isCorrectParams) {
        res.sendStatus(400);

        return;
      }

      const newExpense = await expenseService.create({
        userId,
        title,
        amount,
        spentAt,
      });

      res.statusCode = 201;
      res.send(newExpense);
    } catch (error) {
      res.sendStatus(500);
    }
  },
  remove: async(req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    try {
      await expenseService.remove(id);

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
