'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const get = async(req, res) => {
  try {
    const expenses = await expenseService.getExpenses(req.query);

    res.send(expenses);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const getOne = async(req, res) => {
  const id = req.params.id;

  try {
    const expense = await expenseService.getById(id);

    if (!expense) {
      res.status(404).send({ error: 'Not Found' });

      return;
    }

    res.send(expense);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const create = async(req, res) => {
  try {
    const user = await userService.getById(req.body.userId);

    if (!user) {
      res.status(400).send({ error: 'Bad request. User not found' });

      return;
    }

    const newExpense = await expenseService.create(req.body);

    res.status(201).send(newExpense);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const remove = async(req, res) => {
  const id = req.params.id;

  try {
    const count = await expenseService.remove(id);

    if (!count) {
      res.status(404).send({ error: 'Not Found' });

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const update = async(req, res) => {
  const id = req.params.id;

  try {
    const [count] = await expenseService.update(id, req.body);

    if (!count) {
      res.status(404).send({ error: 'Not Found' });

      return;
    }

    const updatedExpense = await expenseService.getById(id);

    res.status(200).send(updatedExpense);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

module.exports = {
  get, getOne, create, remove, update,
};
