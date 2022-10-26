'use strict';

const {
  isValidExpenseBody,
  addExpense,
  getExpensesByQuery,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
} = require('../services/expenses');
const { getUserById } = require('../services/users');

module.exports = {
  async operateAddExpense(req, res) {
    const { body } = req;
    const { userId } = body;

    try {
      const foundUser = await getUserById(userId);

      if (
        !isValidExpenseBody(body, true)
        || !foundUser
      ) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      const newExpense = await addExpense(body);

      res
        .status(201)
        .send(newExpense);
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },

  async operateGetExpensesByQuery(req, res) {
    const { query } = req;

    try {
      const allExpenses = await getExpensesByQuery(query);

      res
        .status(200)
        .send(allExpenses);
    } catch (error) {
      res
        .status(400)
        .send('Bad request');
    }
  },

  async operateGetExpenseById(req, res) {
    const { id } = req.params;

    try {
      const foundExpense = await getExpenseById(id);

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

  async operateUpdateExpenseById(req, res) {
    const { id } = req.params;
    const { body } = req;

    if (!id || !isValidExpenseBody(body)) {
      res
        .status(400)
        .send('Bad request');

      return;
    };

    try {
      const updatedExpense = await updateExpenseById(id, body);

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

  async operateDeleteExpenseById(req, res) {
    const { id } = req.params;

    try {
      const isSucceed = await deleteExpenseById(id);

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
