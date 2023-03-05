'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  try {
    const users = await expensesService.getAll(req.query);

    res.send(users);
  } catch (err) {
    res.sendStatus(400);
  }
};

const getById = async(req, res) => {
  const { id } = req.params;

  try {
    const expense = await expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  const data = req.body;

  try {
    if (!await usersService.getById(data.userId)) {
      res.sendStatus(404);

      return;
    }

    const expense = await expensesService.add(data);

    res.statusCode = 201;
    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  try {
    if (!await expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    await expensesService.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  const { id } = req.params;

  try {
    if (!await expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    await expensesService.update(id, req.body);

    const expense = await expensesService.getById(id);

    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
