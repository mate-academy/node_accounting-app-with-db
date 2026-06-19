'use strict';

const ExpenseService = require('../services/expense.service');

module.exports = {
  getAll: async (req, res) => {
    const result = await ExpenseService.getAll(req.query);

    res.send(result);
  },

  get: async (req, res) => {
    const expense = await ExpenseService.getById(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  },

  create: async (req, res) => {
    try {
      const newExpense = await ExpenseService.create(req.body);

      res.status(201).send(newExpense);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  },

  edit: async (req, res) => {
    try {
      const updated = await ExpenseService.update(req.params.id, req.body);

      res.send(updated);
    } catch (err) {
      if (err.message === 'Expense not found') {
        return res.sendStatus(404);
      }

      res.status(400).send({ message: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      await ExpenseService.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      if (err.message === 'Expense not found') {
        return res.sendStatus(404);
      }

      res.status(400).send({ message: err.message });
    }
  },
};
