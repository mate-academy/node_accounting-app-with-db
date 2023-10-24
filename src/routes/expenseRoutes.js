'use strict';

const express = require('express');
const expenseService = require('../services/expenseService');

const expenseRoutes = (expenses, users) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    const newExpenseData = req.body;

    const newExpense = expenseService
      .createExpense(expenses, newExpenseData, users);

    if (newExpense === null) {
      return res.status(400).send({ message: 'User not found or bad data' });
    }

    res.status(201).json(newExpense);
  });

  router.get('/', (req, res) => {
    const filteredExpenses = expenseService
      .getFilteredExpenses(expenses, req.query);

    res.status(200).json(filteredExpenses);
  });

  router.get('/:id', (req, res) => {
    const expense = expenseService.getExpenseById(expenses, req.params.id);

    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).json(expense);
  });

  router.patch('/:id', (req, res) => {
    const updatedExpense = expenseService
      .updateExpense(expenses, req.params.id, req.body);

    if (!updatedExpense) {
      return res.status(404).send();
    }

    res.status(200).json(updatedExpense);
  });

  router.delete('/:id', (req, res) => {
    const deleted = expenseService.deleteExpense(expenses, req.params.id);

    if (!deleted) {
      return res.status(404).send();
    }

    res.status(204).send();
  });

  return router;
};

module.exports = expenseRoutes;
