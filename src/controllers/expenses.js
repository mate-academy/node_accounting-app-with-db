'use strict';

const { ExpensesService } = require('../services/expenses');

const initExpensesController = (userController) => {
  const expensesService = new ExpensesService();

  return {
    async addExpense(req, res) {
      const { body } = req;
      const { userId } = body;

      try {
        const foundUser = await userController.usersService.getUserById(userId);

        if (
          !expensesService.isValidExpenseBody(body, true)
          || !foundUser
        ) {
          res
            .status(400)
            .send('Bad request');

          return;
        };

        const newExpense = await expensesService.addExpense(body);

        res
          .status(201)
          .send(newExpense);
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },

    async getAllExpenses(req, res) {
      const { query } = req;

      try {
        const allExpenses = await expensesService.getExpensesByQuery(query);

        res
          .status(200)
          .send(allExpenses);
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },

    async getExpenseById(req, res) {
      const { id } = req.params;

      try {
        const foundExpense = await expensesService.getExpenseById(id);

        if (!foundExpense) {
          res
            .status(404)
            .send('Not found');

          return;
        }

        res
          .status(200)
          .send(foundExpense);
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },

    async updateExpenseById(req, res) {
      const { id } = req.params;
      const { body } = req;

      if (!id || !expensesService.isValidExpenseBody(body)) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      try {
        const updatedExpense = await expensesService
          .updateExpenseById(id, body);

        if (!updatedExpense) {
          res
            .status(404)
            .send('Not found');

          return;
        }

        res
          .status(200)
          .send(updatedExpense);
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },

    async deleteExpenseById(req, res) {
      const { id } = req.params;

      try {
        const isSucceed = await expensesService.deletExpenseById(id);

        if (!isSucceed) {
          res
            .status(404)
            .send('Not found');

          return;
        }

        res
          .status(204)
          .end();
      } catch (error) {
        res
          .status(400)
          .send('Bad request');
      }
    },
  };
};

module.exports = { initExpensesController };
