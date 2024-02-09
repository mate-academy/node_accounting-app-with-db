/* eslint-disable no-console */
'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const allExpenses = await expensesService.getAllExpenses(
      userId, categories, from, to);

    if (!allExpenses) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    res.send(allExpenses);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  try {
    const item = await expensesService.getExpensesById(id);

    if (!item) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    res.send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await userService.getUsersById(Number(userId));

  if (!user || !title) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  try {
    const item = await expensesService.createExpenses(userId,
      spentAt,
      title,
      amount,
      category,
      note);

    if (!item) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  try {
    const itemId = parseInt(id, 10);

    const item = await expensesService.getExpensesById(itemId);

    if (!item) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    if (typeof title !== 'string') {
      res.sendStatus(422);

      return;
    }

    await expensesService.updateExpenses(itemId, { title });

    const updatedItem = await expensesService.getExpensesById(itemId);

    res.send(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  try {
    const item = await expensesService.getExpensesById(Number(id));

    if (!item) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    await expensesService.removeExpenses(Number(id));

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
