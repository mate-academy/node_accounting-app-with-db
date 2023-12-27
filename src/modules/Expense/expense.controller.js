/* eslint-disable no-console */
'use strict';

const { ExpenseService } = require('./expense.service');

class ExpenseController {
  static async getAll(req, res) {
    try {
      const { userId, categories, from, to } = req.query;

      if (!userId || !categories || !from || !to) {
        res.status(400).send('ERROR: one of the queries was not passed');
      }

      const allExpenses = await ExpenseService.getAll({
        userId, categories, from, to,
      });

      res.status(200).send(allExpenses);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal server error');
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400)
          .send('ERROR: Bad request. The expense id was not passed');
      }

      const expense = await ExpenseService.getById(id);

      if (!expense) {
        res.status(404)
          .send(`ERROR: This expense with id=${id} does not exist`);
      }

      res.status(200).send(expense);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal server error');
    }
  }

  static async create(req, res) {
    try {
      const { userId, title, spentAt, amount, category, note } = req.body;

      if (!userId || !title || !spentAt || !amount || !category) {
        res.status(400).send('Error: Bad request');
      }

      const newExpense = await ExpenseService.create({
        userId, title, spentAt, amount, category, note,
      });

      res.status(201).send(JSON.stringify(newExpense));
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal server error');
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const newProperties = req.body;

      if (!id) {
        res.status(400)
          .send('ERROR: Bad request. The expense id was not passed');
      }

      const expenseToUpdate = ExpenseService.getById(id);

      if (!expenseToUpdate) {
        res.status(404)
          .send(`ERROR: This expense with id=${id} does not exist`);
      }

      const updatedExpense = await ExpenseService
        .update(id, newProperties);

      res.status(200).send(updatedExpense);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal server error');
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400)
          .send('ERROR: Bad request. The expense id was not passed');
      }

      await ExpenseService.delete(id);

      res.sendStatus(204);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = { ExpenseController };
