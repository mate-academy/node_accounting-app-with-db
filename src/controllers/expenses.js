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

    getAllExpenses(req, res) {
      res
        .status(200)
        .send(expensesService.getExpensesByQuery(req.query));
    },

    getExpenseById(req, res) {
      if (!req.params.id) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      const foundExpense = expensesService.getExpenseById(req.params.id);

      if (!foundExpense) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(200)
        .send(foundExpense);
    },

    updateExpenseById(req, res) {
      if (!expensesService.getExpenseById(req.params.id)) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      if (!req.params.id || !expensesService.isValidExpenseBody(req.body)) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      res
        .status(200)
        .send(expensesService.updateExpenseById(req.params.id, req.body));
    },

    deleteExpenseById(req, res) {
      if (!expensesService.deletExpenseById(req.params.id)) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(204)
        .end();
    },
  };
};

module.exports = { initExpensesController };
